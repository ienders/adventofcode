package adventofcode

class IntcodeComputer(
    program: List<Long>,
    val inputs: MutableList<Long> = mutableListOf(),
    val output: MutableList<Long> = mutableListOf(),
    private var pos: Int = 0,
    private var relBase: Int = 0,
    var state: State = State.Pending
) {

    private val memory: Array<Long> = Array(program.size * 10) { 0L }.also {
        program.forEachIndexed { i, value ->
            it[i] = value
        }
    }

    enum class State {
        Pending,
        Halted,
        Complete
    }

    private enum class ParamMode {
        Position,
        Immediate,
        Relative
    }

    private class ParamModes(codes: String) {
        private val modes = codes.map { ParamMode.values()[it.toString().toInt()] }.reversed()

        fun mode(offset: Int): ParamMode =
            modes[offset - 1]

        override fun toString(): String =
            modes.toString()

    }

    private abstract class Operation(
        val computer: IntcodeComputer,
        protected val paramModes: ParamModes
    ) {
        open val terminal: Boolean = false
        open val inputSize: Int = 0

        open fun execute() = Unit

        open fun jump() {
            computer.pos += inputSize + 1
        }

        protected fun getWithMode(offset: Long): Long =
            when (paramModes.mode(offset.toInt())) {
                ParamMode.Position -> getRef(offset)
                ParamMode.Immediate -> get(offset)
                ParamMode.Relative -> getRel(offset)
            }

        protected fun setWithMode(offset: Long, value: Long) {
            when (paramModes.mode(offset.toInt())) {
                ParamMode.Position -> setRef(offset, value)
                ParamMode.Immediate -> set(offset, value)
                ParamMode.Relative -> setRel(offset, value)
            }
        }

        private fun get(offset: Long)    = computer.memory[computer.pos + offset.toInt()]
        private fun getRef(offset: Long) = computer.memory[get(offset).toInt()]
        private fun getRel(offset: Long) = computer.memory[computer.relBase + get(offset).toInt()]

        private fun set(position: Long, value: Long) {
            computer.memory[position.toInt()] = value
        }

        private fun setRef(offset: Long, value: Long) {
            set(get(offset), value)
        }

        private fun setRel(offset: Long, value: Long) {
            computer.memory[computer.relBase + get(offset).toInt()] = value
        }

    }

    private class TerminalOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val terminal = true
    }

    private class AddOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val inputSize = 3
        override fun execute() {
            setWithMode(3, getWithMode(1) + getWithMode(2))
        }
    }

    private class MultiplyOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val inputSize = 3
        override fun execute() {
            setWithMode(3, getWithMode(1) * getWithMode(2))
        }
    }

    private class InputOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val inputSize = 1
        override fun execute() {
            if (computer.inputs.isEmpty()) {
                computer.state = State.Halted
            } else {
                setWithMode(1, computer.inputs.removeAt(0))
                computer.state = State.Pending
            }
        }
    }

    private class OutputOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val inputSize = 1
        override fun execute() {
            computer.output.add(getWithMode(1))
        }
    }

    private class JumpIfTrueOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val inputSize = 2
        override fun jump() {
            if (getWithMode(1) != 0L) computer.pos = getWithMode(2).toInt()
            else super.jump()
        }
    }

    private class JumpIfFalseOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val inputSize = 2
        override fun jump() {
            if (getWithMode(1) == 0L) computer.pos = getWithMode(2).toInt()
            else super.jump()
        }
    }

    private class LessThanOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val inputSize = 3
        override fun execute() {
            setWithMode(3, if (getWithMode(1) < getWithMode(2)) 1 else 0)
        }
    }

    private class EqualsOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val inputSize = 3
        override fun execute() {
            setWithMode(3, if (getWithMode(1) == getWithMode(2)) 1 else 0)
        }
    }

    private class RelativeBaseOffsetOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val inputSize = 1
        override fun execute() {
            computer.relBase += getWithMode(1).toInt()
        }
    }

    fun execute() {
        while (true) {
            val paddedCode = memory[pos].toString().padStart(5, '0')
            val paramModes = ParamModes(paddedCode.take(3))
            val operation = when (paddedCode.takeLast(2)) {
                "01" -> AddOperation(this, paramModes)
                "02" -> MultiplyOperation(this, paramModes)
                "03" -> InputOperation(this, paramModes)
                "04" -> OutputOperation(this, paramModes)
                "05" -> JumpIfTrueOperation(this, paramModes)
                "06" -> JumpIfFalseOperation(this, paramModes)
                "07" -> LessThanOperation(this, paramModes)
                "08" -> EqualsOperation(this, paramModes)
                "09" -> RelativeBaseOffsetOperation(this, paramModes)
                "99" -> TerminalOperation(this, paramModes)
                else -> throw IllegalStateException("Invalid intcode ${paddedCode.takeLast(2)}")
            }
            if (operation.terminal) {
                state = State.Complete
                return
            }
            operation.execute()
            if (state == State.Halted) {
                return
            }
            operation.jump()
        }
    }

    fun memory(): List<Long> = memory.toList()

}
