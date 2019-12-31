package adventofcode

import java.lang.Integer.max

class Day13Solution : Solution(13) {

    private val tiles = mapOf(
        0 to " ",
        1 to "█",
        2 to "□",
        3 to "-",
        4 to "●"
    )

    private fun processScreen(
        screen: MutableMap<Pair<Int, Int>, Int>,
        output: List<Long>
    ): Int {
        var score = 0
        output.chunked(3).forEach { tile ->
            val x = tile[0].toInt()
            val y = tile[1].toInt()
            val value = tile[2].toInt()
            if (x == -1) score = value else screen[Pair(x, y)] = value
        }
        return score
    }

    private fun renderScreen(screen: Map<Pair<Int, Int>, Int>) {
        val xCoords = screen.keys.map{ it.first }
        val yCoords = screen.keys.map{ it.second }
        val buffer = StringBuffer()
        for (y in yCoords.min()!!..yCoords.max()!!) {
            buffer.appendln()
            for (x in xCoords.min()!!..xCoords.max()!!) {
                buffer.append(tiles[screen[Pair(x, y)] ?: 0])
            }
        }
        println("\u001Bc")
        print(buffer.toString())
    }

    private fun blockCount(screen: Map<Pair<Int, Int>, Int>): Int =
        screen.values.count { cell -> cell == 2 }

    private fun paddleX(screen: Map<Pair<Int, Int>, Int>): Int =
        screen.filter { it.value == 3 }.toList().first().first.first

    private fun ballX(screen: Map<Pair<Int, Int>, Int>): Int =
        screen.filter { it.value == 4 }.toList().first().first.first

    override fun part1(): String =
        IntcodeComputer(intcodeInput).let {
            it.execute()
            mutableMapOf<Pair<Int, Int>, Int>().let { screen ->
                processScreen(screen, it.output)
                blockCount(screen)
            }
        }.toString()

    override fun part2(): String {
        val inputStream = mutableListOf<Long>()
        val screen = mutableMapOf<Pair<Int, Int>, Int>()
        var score = 0
        IntcodeComputer(intcodeInput, inputStream).let {
            it.hackMemory(0, 2)
            while (it.state != IntcodeComputer.State.Complete) {
                it.execute()
                val newScore = processScreen(screen, it.output)
                if (newScore > 0) score = newScore
                it.output.clear()
                inputStream.add(max(-1, Integer.min(1, ballX(screen) - paddleX(screen))).toLong())
                renderScreen(screen)
                println("\n\nSCORE: $score\n\n")
                Thread.sleep(50L)
            }
        }
        return score.toString()
    }

}
