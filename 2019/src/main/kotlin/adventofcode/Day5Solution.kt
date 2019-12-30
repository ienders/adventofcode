package adventofcode

class Day5Solution : Solution(5) {

    private fun execute(input: Long) =
        IntcodeComputer(intcodeInput, inputs = mutableListOf(input)).let {
            it.execute()
            it.output.joinToString("").toInt().toString()
        }

    override fun part1() = execute(1)
    override fun part2() = execute(5)

}
