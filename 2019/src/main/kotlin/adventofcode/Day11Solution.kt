package adventofcode

class Day11Solution : Solution(11) {

    private fun turn(dir: Pair<Int, Int>, turn: Int) =
        when (turn) {
            0 -> when (dir) {
                Pair(0, -1) -> Pair(-1, 0)
                Pair(-1, 0) -> Pair(0, 1)
                Pair(0, 1)  -> Pair(1, 0)
                Pair(1, 0)  -> Pair(0, -1)
                else -> throw IllegalStateException()
            }
            1 -> when (dir) {
                Pair(0, -1) -> Pair(1, 0)
                Pair(1, 0)  -> Pair(0, 1)
                Pair(0, 1)  -> Pair(-1, 0)
                Pair(-1, 0) -> Pair(0, -1)
                else -> throw IllegalStateException()
            }
            else -> throw IllegalStateException()
        }

    private fun execute(grid: MutableMap<Pair<Int, Int>, Int>) {
        var dir = Pair(0, -1)
        var pos = Pair(0, 0)
        val inputStream = mutableListOf<Long>()
        val robot = IntcodeComputer(intcodeInput, inputs = inputStream)
        while (robot.state != IntcodeComputer.State.Complete) {
            inputStream.add((grid[pos] ?: 0).toLong())
            robot.execute()
            grid[pos] = robot.output.removeAt(0).toInt()
            dir = turn(dir, robot.output.removeAt(0).toInt())
            pos = Pair(pos.first + dir.first, pos.second + dir.second)
        }
    }

    override fun part1(): String {
        val grid = mutableMapOf<Pair<Int, Int>, Int>()
        execute(grid)
        return grid.size.toString()
    }

    override fun part2(): String {
        val grid = mutableMapOf<Pair<Int, Int>, Int>()
        grid[Pair(0,0)] = 1
        execute(grid)
        val xCoords = grid.keys.map{ it.first }
        val yCoords = grid.keys.map{ it.second }
        val buffer = StringBuffer()
        for (y in yCoords.min()!!..yCoords.max()!!) {
            buffer.appendln()
            for (x in xCoords.min()!!..xCoords.max()!!) {
                buffer.append(if (grid[Pair(x, y)] ?: 0 == 0) " " else "█")
            }
        }
        return buffer.toString()
    }

}
