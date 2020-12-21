package adventofcode

class Day11Solution : Solution(11) {

    private abstract class Simulator(
        protected var layout: List<List<Boolean?>>,
        private val emptyTolerance: Int
    ) {

        protected abstract fun valueAt(x: Int, y: Int, dir: Pair<Int, Int>): Boolean

        protected val adjacencyDirs: List<Pair<Int, Int>> =
            (-1..1).map { x ->
                (-1..1).mapNotNull { y ->
                    if (x == 0 && y == 0) null
                    else Pair(x, y)
                }
            }.flatten()

        private fun count(x: Int, y: Int): Int =
            adjacencyDirs.count { valueAt(x, y, it) }

        private fun round(): Boolean {
            var changed = false

            val next = mutableListOf<List<Boolean?>>()

            layout.forEachIndexed { i, row ->
                val nextRow = row.toMutableList()
                row.forEachIndexed { j, col ->
                    when (col) {
                        false -> {
                            if (count(i, j) == 0) {
                                nextRow[j] = true
                                changed = true
                            }
                        }
                        true -> {
                            if (count(i, j) >= emptyTolerance) {
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

        fun simulateOccupiedSeats(): Int {
            while (round()) {}
            return occupiedSeats
        }

    }

    private class DirectAdjacencySimulator(
        layout: List<List<Boolean?>>
    ) : Simulator(layout, emptyTolerance = 4) {

        override fun valueAt(x: Int, y: Int, dir: Pair<Int, Int>): Boolean =
            layout.getOrNull(x + dir.first)?.getOrNull(y + dir.second) == true

    }

    private class RayBasedAdjacencySimulator(
        layout: List<List<Boolean?>>
    ) : Simulator(layout, emptyTolerance = 5) {

        override fun valueAt(x: Int, y: Int, dir: Pair<Int, Int>): Boolean {
            var currX = x
            var currY = y
            val maxX = layout.size
            val maxY = layout[0].size
            do {
                currX += dir.first
                currY += dir.second
                layout.getOrNull(currX)?.getOrNull(currY).let {
                    if (it != null) return it
                }
            } while (currX in 0..maxX && currY in 0..maxY)
            return false
        }

    }

    private val layout: List<List<Boolean?>> = inputLines.map {
        it.map { position -> if (position == 'L') false else null }
    }

    override fun part1(): String =
        DirectAdjacencySimulator(layout).simulateOccupiedSeats().toString()

    override fun part2(): String =
        RayBasedAdjacencySimulator(layout).simulateOccupiedSeats().toString()

}
