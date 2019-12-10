package adventofcode

class Day5Solution : Solution(5) {

    private fun computer(input: Int): IntcodeComputer =
        IntcodeComputer(intcodeInput, inputs = mutableListOf(input.toLong()))

    override fun part1(): String =
        computer(1).let {
            it.execute()
            it.output.joinToString("").toInt().toString()
        }

    override fun part2() =
        computer(5).let {
            it.execute()
            it.output.joinToString("").toInt().toString()
        }

}
