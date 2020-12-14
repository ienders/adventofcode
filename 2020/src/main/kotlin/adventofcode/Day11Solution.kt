package adventofcode

class Day11Solution : Solution(11) {

    private var layout: List<List<Boolean?>> = inputLines.map {
        it.map { position -> if (position == 'L') false else null }
    }

    private fun directAdjacencyCount(x: Int, y: Int): Int =
        listOf(
            layout.getOrNull(x - 1)?.getOrNull(y - 1),
            layout.getOrNull(x - 1)?.getOrNull(y),
            layout.getOrNull(x - 1)?.getOrNull(y + 1),
            layout.getOrNull(x)?.getOrNull(y - 1),
            layout.getOrNull(x)?.getOrNull(y + 1),
            layout.getOrNull(x + 1)?.getOrNull(y - 1),
            layout.getOrNull(x + 1)?.getOrNull(y),
            layout.getOrNull(x + 1)?.getOrNull(y + 1)
        ).count { it == true }

    private fun round(): Boolean {
        var changed = false

        val next = mutableListOf<List<Boolean?>>()

        layout.forEachIndexed { i, row ->
            val nextRow = row.toMutableList()
            row.forEachIndexed { j, col ->
                when (col) {
                    false -> {
                        if (directAdjacencyCount(i, j) == 0) {
                            nextRow[j] = true
                            changed = true
                        }
                    }
                    true -> {
                        if (directAdjacencyCount(i, j) >= 4) {
                            nextRow[j] = false
                            changed = true
                        }
                    }
                }
            }
            next.add(nextRow)
        }

        if (changed) {
            layout = next.toList()
        }

        return changed
    }

    private val occupiedSeats: Int
        get() = layout.sumBy { row ->
            row.count { col -> col == true }
        }

    override fun part1(): String {
        while (round()) {}
        return occupiedSeats.toString()
    }

    override fun part2() = "TODO"

}
