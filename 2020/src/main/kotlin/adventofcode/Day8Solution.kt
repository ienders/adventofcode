package adventofcode

class Day8Solution : Solution(8) {

    private enum class Operation {
        NOP, ACC, JMP
    }

    private class Instruction(spec: String) {
        private var operation: Operation
        private val argument: Int

        var executionCount = 0

        init {
            spec.split(" ").let { (opStr, argStr) ->
                operation = Operation.valueOf(opStr.toUpperCase())
                argument = argStr.toInt()
            }
        }

        fun execute(state: Pair<Int, Int>): Pair<Int, Int> =
            when (operation) {
                Operation.NOP -> Pair(state.first + 1, state.second)
                Operation.ACC -> Pair(state.first + 1, state.second + argument)
                Operation.JMP -> Pair(state.first + argument, state.second)
            }.also {
                executionCount += 1
            }

        fun flip() {
            operation = when (operation) {
                Operation.NOP -> Operation.JMP
                Operation.ACC -> Operation.ACC
                Operation.JMP -> Operation.NOP
            }
        }
    }

    private fun run(instructions: List<Instruction>): Pair<Boolean, Int> {
        var state = Pair(0, 0)
        while (state.first < instructions.size) {
            val instruction = instructions[state.first]
            if (instruction.executionCount > 0) {
                return Pair(false, state.second)
            }
            state = instruction.execute(state)
        }
        return Pair(true, state.second)
    }

    private val instructions: List<Instruction>
        get() = inputLines.map { Instruction(it) }

    override fun part1() = run(instructions).second.toString()

    override fun part2(): String {
        var pos = 0
        while (true) {
            instructions.also {
                it[pos].flip()
                pos += 1
                val result = run(it)
                if (result.first) {
                    return result.second.toString()
                }
            }
        }
    }

}
