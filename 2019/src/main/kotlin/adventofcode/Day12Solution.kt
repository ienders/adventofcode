package adventofcode

import java.lang.Integer.max
import java.lang.Integer.min
import kotlin.math.abs
import kotlin.math.pow

class Day12Solution : Solution(12) {

    private class Moon(
        val pos: Array<Int>
    ) {
        val vel: Array<Int> = Array(3) { 0 }
        private val initialPos = pos.clone()

        val energy: Int
            get() = pos.map { abs(it) }.sum() * vel.map { abs(it) }.sum()

        fun equalsInitial(axis: Int): Boolean =
            pos[axis] == initialPos[axis] && vel[axis] == 0

    }

    private val loadMoons: List<Moon>
        get() = inputLines.map {
            val (x, y, z) = Regex("<x=(.*), y=(.*), z=(.*)>").find(it)!!.destructured
            Moon(pos = arrayOf(x.toInt(), y.toInt(), z.toInt()))
        }

    private fun applyGravity(axes: Array<Int>, moonA: Moon, moonB: Moon) {
        axes.forEach {
            moonA.vel[it] += max(-1, min(1, moonB.pos[it] - moonA.pos[it]))
            moonB.vel[it] += max(-1, min(1, moonA.pos[it] - moonB.pos[it]))
        }
    }

    private fun applyVelocity(axes: Array<Int>, moon: Moon) {
        axes.forEach {
            moon.pos[it] += moon.vel[it]
        }
    }

    private fun step(moons: List<Moon>, axes: Array<Int>) {
        for (a in moons.indices) {
            for (b in a + 1 until moons.size)
                applyGravity(axes, moons[a], moons[b])
            applyVelocity(axes, moons[a])
        }
    }

    private fun primeFactors(n: Long): MutableList<Long> {
        if (n < 2) return mutableListOf()
        val primeFactors = mutableListOf<Long>()
        var remainder = n
        var i = 2L
        while (i <= remainder / i) {
            while (remainder % i == 0L) {
                primeFactors.add(i)
                remainder /= i
            }
            i++
        }
        if (remainder > 1) primeFactors.add(remainder)
        return primeFactors
    }

    private fun leastCommonMultiple(numbers: Array<Long>): Long {
        val primeFactors = numbers.map { primeFactors(it) }
        var lcm = 1L
        while (!primeFactors.all { it.isEmpty() }) {
            val nextBase = primeFactors.mapNotNull { it.firstOrNull() }.min()!!
            val exponent = primeFactors.map { it.count { factor -> factor == nextBase } }.max()!!
            lcm *= nextBase.toDouble().pow(exponent).toLong()
            primeFactors.forEach {
                it.removeAll { factor -> factor == nextBase }
            }
        }
        return lcm
    }

    override fun part1(): String {
        val moons = loadMoons
        repeat(1000) {
            step(moons, arrayOf(0, 1, 2))
        }
        return moons.map { it.energy }.sum().toString()
    }

    override fun part2(): String {
        val axisCycles: Array<Long> = Array(3) { 0L }
        for (axis in 0..2) {
            val moons = loadMoons
            var i = 0L
            while (true) {
                step(moons, arrayOf(axis))
                i += 1L
                if (moons.all { it.equalsInitial(axis) }) {
                    axisCycles[axis] = i
                    break
                }
            }
        }
        return leastCommonMultiple(axisCycles).toString()
    }

}
