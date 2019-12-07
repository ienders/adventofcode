package adventofcode

import java.lang.Integer.min
import kotlin.math.abs

class Day3Solution : Solution(3) {

    private val input = inputLines

    private val wireAPath: List<String> = input[0].split(",")
    private val wireBPath: List<String> = input[1].split(",")

    private val grid: MutableMap<
        Pair<Int, Int>,
        MutableMap<String, Int>
    > = mutableMapOf()

    private var minDistance = Int.MAX_VALUE
    private var minIntersectionDistance = Int.MAX_VALUE

    private fun runWire(wire: List<String>, wireLabel: String) {
        var x = 0
        var y = 0
        var len = 0
        wire.forEach {
            val direction = it.take(1)
            repeat(it.substring(1).toInt()) {
                when (direction) {
                    "U" -> y += 1
                    "D" -> y -= 1
                    "L" -> x -= 1
                    "R" -> x += 1
                }
                len += 1
                val coords = Pair(x, y)
                val distance = abs(x) + abs(y)
                if (grid.containsKey(coords)) {
                    grid[coords]!![wireLabel] = grid[coords]!![wireLabel] ?: len
                    if (grid[coords]!!.minus(wireLabel).isNotEmpty()) {
                        minDistance = min(minDistance, distance)
                        minIntersectionDistance = min(grid[coords]!!.values.sum(), minIntersectionDistance)
                    }
                } else {
                    grid[coords] = mutableMapOf(wireLabel to len)
                }
            }
        }
    }

    init {
        runWire(wireAPath, "A")
        runWire(wireBPath, "B")
    }

    override fun part1() = minDistance.toString()
    override fun part2() = minIntersectionDistance.toString()

}
