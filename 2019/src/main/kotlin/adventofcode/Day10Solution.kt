package adventofcode

import java.lang.Integer.max
import java.lang.Integer.min
import kotlin.math.PI
import kotlin.math.atan2

class Day10Solution : Solution(10) {

    private val map: Array<Array<Boolean>> = inputLines.map {
        it.map { position -> position == '#' }.toTypedArray()
    }.toTypedArray()

    private val sizeY = map.size
    private val sizeX = map[0].size

    class Ray(
        val dir: Pair<Int, Int>,
        val pos: Pair<Int, Int>,
        val step: Int,
        private var ticks: Int = 0,
        private var blocked: Boolean = false
    ) {

        var curPos = pos.copy()

        val angle: Double
            get() = (atan2(dir.second.toDouble(), dir.first.toDouble()) * 180 / PI + 450) % 360

        fun travel(map: Array<Array<Boolean>>): Boolean {
            var newMeteorVisible = false
            if (ticks == 0) {
                tick()
                if (!blocked && atMeteor(map)) {
                    newMeteorVisible = true
                    blocked = true
                }
            }
            ticks = (ticks + 1) % step
            return newMeteorVisible
        }

        private fun tick() {
            curPos = Pair(curPos.first + dir.first, curPos.second + dir.second)
        }

        private fun atMeteor(map: Array<Array<Boolean>>): Boolean =
            try {
                map[curPos.second][curPos.first]
            } catch (ex: ArrayIndexOutOfBoundsException) {
                false
            }

        fun fire(map: Array<Array<Boolean>>): Pair<Int, Int>? {
            val sizeY = map.size
            val sizeX = map[0].size
            curPos = pos
            while (curPos.first in 0 until sizeX && curPos.second in 0 until sizeY) {
                tick()
                if (atMeteor(map)) {
                    map[curPos.second][curPos.first] = false
                    return curPos
                }
            }
            return null
        }
    }

    private var maxSeen = 0
    private var maxPos = Pair(0, 0)
    private var raysFromMax = mutableListOf<Ray>()

    init {
        for (y in 0 until sizeY) {
            for (x in 0 until sizeX) {
                if (map[y][x]) {
                    val (seen, rays) = scanMeteor(x, y)
                    if (seen > maxSeen) {
                        maxSeen = seen
                        maxPos = Pair(x, y)
                        raysFromMax = rays
                    }
                }
            }
        }
    }

    private fun step(x: Int, y: Int, radius: Int, rays: MutableList<Ray>): Int {
        var seen = rays.count { it.travel(map) }
        val positionSet = rays.map { it.curPos }.toSet()

        val newRayDirections = mutableSetOf<Pair<Int, Int>>()
        for (yPos in max(y - radius, 0)..min(y + radius, sizeY - 1)) {
            if (x - radius >= 0)    newRayDirections.add(Pair(-radius, yPos - y))
            if (x + radius < sizeX) newRayDirections.add(Pair(radius,  yPos - y))
        }
        for (xPos in max(x - radius, 0)..min(x + radius, sizeX - 1)) {
            if (y - radius >= 0)    newRayDirections.add(Pair(xPos - x, -radius))
            if (y + radius < sizeY) newRayDirections.add(Pair(xPos - x, radius))
        }

        val newRays = newRayDirections
            .filter { (xDir, yDir) ->
                !positionSet.contains(Pair(x + xDir, y + yDir))
            }
            .map { Ray(dir = it, pos = Pair(x, y), step = radius) }

        seen += newRays.count { it.travel(map) }
        rays.addAll(newRays)

        return seen
    }

    private fun scanMeteor(x: Int, y: Int): Pair<Int, MutableList<Ray>> {
        val rays = mutableListOf<Ray>()
        var radius = 0
        var seen = 0
        while (true) {
            radius += 1
            val numRays = rays.size
            seen += step(x, y, radius, rays)
            if (rays.size == numRays) {
                return Pair(seen, rays)
            }
        }
    }

    override fun part1() = maxSeen.toString()

    override fun part2(): String {
        raysFromMax.sortBy { it.angle }
        var destroyed = 0
        var index = 0
        while (true) {
            val pos = raysFromMax[index].fire(map)
            if (pos != null) {
                destroyed += 1
                if (destroyed == 200) {
                    return (pos.first * 100 + pos.second).toString()
                }
                index += 1
            } else {
                raysFromMax.removeAt(index)
            }
            index %= raysFromMax.size
        }
    }

}
