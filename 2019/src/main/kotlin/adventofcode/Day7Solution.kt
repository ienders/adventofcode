package adventofcode

import java.lang.Integer.max

class Day7Solution : Solution(7) {

    private class Amplifier(program: MutableList<Long>, phaseSignal: Int) {

        private val computer: IntcodeComputer =
            IntcodeComputer(program, inputs = mutableListOf(phaseSignal.toLong()))

        fun run(inputSignal: Long): Long? {
            computer.inputs.add(inputSignal)
            computer.execute()
            return computer.output.removeAt(0)
        }

        val isDone: Boolean
            get() = computer.state == IntcodeComputer.State.Complete

    }

    private fun runAmplifiers(phaseSignals: Array<Int>): Long {
        val amps = phaseSignals.map { Amplifier(intcodeInput, it) }
        var i = 0
        var input: Long? = 0L
        while (true) {
            if (input != null) {
                input = amps[i].run(input)
                if (amps.all { it.isDone }) return input!!
            }
            i = (i + 1) % amps.size
        }
    }

    private fun Array<Int>.swap(a: Int, b: Int) {
        val tmp: Int = this[a]
        this[a] = this[b]
        this[b] = tmp
    }

    private fun Array<Int>.forEachPermuteMax(runner: (Array<Int>) -> Long): Int {
        val n = size
        val indexes = Array(n) { 0 }
        var max = runner(this).toInt()
        var i = 0
        while (i < n) {
            if (indexes[i] < i) {
                swap(if (i % 2 == 0) 0 else indexes[i], i)
                max = max(runner(this).toInt(), max)
                indexes[i]++
                i = 0
            } else {
                indexes[i] = 0
                i++
            }
        }
        return max
    }

    override fun part1() = arrayOf(0, 1, 2, 3, 4).forEachPermuteMax(::runAmplifiers).toString()
    override fun part2() = arrayOf(5, 6, 7, 8, 9).forEachPermuteMax(::runAmplifiers).toString()

}
