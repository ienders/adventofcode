package adventofcode

import java.io.File

abstract class Solution(day: Int) {

    private val filename = "inputs/day$day.txt"

    protected val inputLines: List<String>
        get() = File(javaClass.classLoader.getResource(filename)!!.file).readLines()

    protected val inputLinesAsInts: List<Int>
        get() = inputLines.map(String::toInt)

    protected val inputLinesAsLongs: List<Long>
        get() = inputLines.map(String::toLong)

    protected val inputAsString: String
        get() = inputLines.first()

    protected val inputAsGrid: Array<Array<Boolean>>
        get() = inputLines.map {
            it.map { position -> position == '#' }.toTypedArray()
        }.toTypedArray()

    protected inline fun <reified K : InputGroup> inputAsGroups(): List<K> {
        val groups = mutableListOf<K>()
        var group = K::class.java.constructors.first().newInstance() as K
        groups.add(group)
        inputLines.forEach {
            if (it.isBlank()) {
                group = K::class.java.constructors.first().newInstance() as K
                groups.add(group)
            } else {
                group.addItem(it)
            }
        }
        return groups
    }

    abstract fun part1(): String
    abstract fun part2(): String

}
