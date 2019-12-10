package adventofcode

class Day9Solution : Solution(9) {

    private fun execute(input: Long) =
        IntcodeComputer(intcodeInput, inputs = mutableListOf(input)).let {
            it.execute()
            it.output.removeAt(0).toString()
        }

    override fun part1() = execute(1)

    override fun part2() = execute(2)

}
