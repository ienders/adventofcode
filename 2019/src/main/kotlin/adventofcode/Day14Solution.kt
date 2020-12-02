package adventofcode

import kotlin.math.ceil
import kotlin.math.min

class Day14Solution : Solution(14) {

    private fun elementAndAmount(pair: String): Pair<String, Int> =
        Regex("(\\d+) (.*)").find(pair)!!.destructured.let { (amount, element) ->
            Pair(element, amount.toInt())
        }

    private val reactions: Map<String, Pair<Int, List<Pair<String, Int>>>> =
        inputLines.map { it.split(" => ") }.map { (inputs, output) ->
            val (outElement, outAmount) = elementAndAmount(output)
            outElement to Pair(
                outAmount,
                inputs.split(", ").map { elementAndAmount(it) }
            )
        }.toMap()

    override fun part1(): String {
        var oreRequired = 0
        val leftOvers = mutableMapOf<String, Int>()
        val queue = mutableListOf(Pair("FUEL", 1))
        while (queue.isNotEmpty()) {
            val step = queue.removeAt(0)
            var (element, needed) = step
            val (produced, reagents) = reactions.getValue(element)

            if (leftOvers.containsKey(element)) {
                val leftover = leftOvers[element]!!
                val usableLeftover = min(leftover, needed)
                needed -= usableLeftover
                leftOvers[element] = leftover - usableLeftover
            }

            val multiple = ceil(needed.toDouble() / produced).toInt()
            if (multiple * produced > needed) {
                leftOvers[element] = multiple * produced - needed
            }
            reagents.forEach { (element, amount) ->
                if (element == "ORE") {
                    oreRequired += amount * multiple
                } else {
                    queue.add(Pair(element, amount * multiple))
                }
            }
        }
        return oreRequired.toString()
    }

    override fun part2() = ""

}
