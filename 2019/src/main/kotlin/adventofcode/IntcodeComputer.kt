package adventofcode

import java.lang.IllegalStateException

class IntcodeComputer(
    private val program: MutableList<Int>,
    private val inputVal: Int = 0,
    private var outputVal: String? = null,
    private var pos: Int = 0
) {

    private enum class ParamMode {
        POSITION,
        IMMEDIATE
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

        protected fun getWithMode(offset: Int): Int =
            when (paramModes.mode(offset)) {
                ParamMode.POSITION -> getRef(offset)
                ParamMode.IMMEDIATE -> get(offset)
            }

        protected fun setRef(offset: Int, value: Int) {
            set(get(offset), value)
        }

        protected fun get(offset: Int) = computer.program[computer.pos + offset]
        private fun getRef(offset: Int) = computer.program[get(offset)]

        private fun set(position: Int, value: Int) {
            computer.program[position] = value
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
            setRef(3, getWithMode(1) + getWithMode(2))
        }
    }

    private class MultiplyOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val inputSize = 3
        override fun execute() {
            setRef(3, getWithMode(1) * getWithMode(2))
        }
    }

    private class InputOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val inputSize = 1
        override fun execute() {
            setRef(1, computer.inputVal)
        }
    }

    private class OutputOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val inputSize = 1
        override fun execute() {
            computer.outputVal = (computer.outputVal ?: "") + getWithMode(1).toString()
        }
    }

    private class JumpIfTrueOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val inputSize = 2
        override fun jump() {
            if (getWithMode(1) != 0) computer.pos = getWithMode(2)
            else super.jump()
        }
    }

    private class JumpIfFalseOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val inputSize = 2
        override fun jump() {
            if (getWithMode(1) == 0) computer.pos = getWithMode(2)
            else super.jump()
        }
    }

    private class LessThanOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val inputSize = 3
        override fun execute() {
            setRef(3, if (getWithMode(1) < getWithMode(2)) 1 else 0)
        }
    }

    private class EqualsOperation(
        computer: IntcodeComputer,
        paramModes: ParamModes
    ) : Operation(computer, paramModes) {
        override val inputSize = 3
        override fun execute() {
            setRef(3, if (getWithMode(1) == getWithMode(2)) 1 else 0)
        }
    }

    fun execute(): Int {
        while (true) {
            val paddedCode = program[pos].toString().padStart(5, '0')
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
                "99" -> TerminalOperation(this, paramModes)
                else -> throw IllegalStateException("Invalid intcode")
            }
            if (operation.terminal) return outputVal?.toInt() ?: program[0]
            operation.execute()
            operation.jump()
        }
    }

}
