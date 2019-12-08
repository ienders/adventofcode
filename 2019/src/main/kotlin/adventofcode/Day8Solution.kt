package adventofcode

class Day8Solution : Solution(8) {

    private val layers = inputAsString.map(Char::toString).map(String::toInt).chunked(25 * 6)

    private val grid = Array(6) { Array(25) { 2 } }.also {
        layers.forEach { layer ->
            layer.chunked(25).forEachIndexed { i, row ->
                row.forEachIndexed { j, pixel ->
                    if (it[i][j] == 2) it[i][j] = pixel
                }
            }
        }
    }

    private fun Iterable<Int>.countDigit(digit: Int): Int = count { it == digit }

    override fun part1() =
        layers.minBy { it.countDigit(0) }!!
            .let { it.countDigit(1) * it.countDigit(2) }
            .toString()

    override fun part2() =
        "\n" + grid.joinToString("\n") { it.joinToString("") }
            .replace("1", "█")
            .replace("0", " ")

}
