package adventofcode

class Day5Solution : Solution(5) {

    private fun computer(input: Int): IntcodeComputer =
        IntcodeComputer(intcodeInput, inputVal = input)

    override fun part1(): String = computer(1).execute().toString()
    override fun part2() = computer(5).execute().toString()

}
