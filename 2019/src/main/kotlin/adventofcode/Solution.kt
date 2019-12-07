package adventofcode

import java.io.File

abstract class Solution(day: Int) {

    private val filename = "inputs/day$day.txt"

    protected val inputLines: List<String>
        get() = File(javaClass.classLoader.getResource(filename)!!.file).readLines()

    protected val inputLinesAsInts: List<Int>
        get() = inputLines.map(String::toInt)

    protected val inputAsString: String
        get() = inputLines.first()

    protected val intcodeInput: MutableList<Int>
        get() = inputAsString.split(",").map(String::toInt).toMutableList()

    abstract fun part1(): String
    abstract fun part2(): String

}
