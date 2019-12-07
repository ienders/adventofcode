package adventofcode

import adventofcode.util.inputAsString

class Day4Solution : Solution {

    private val input = inputAsString("inputs/day4.txt").split("-")
    private val min: Int = input[0].toInt()
    private val max: Int = input[1].toInt()

    private val repeatingRegex = "(.)\\1+".toRegex()
    private val exactly2Regex = "(?:^|(.)(?!\\1))(\\d)\\2(?!\\2)".toRegex()

    private fun valid(password: String, regex: Regex): Boolean {
        if (!password.contains(regex)) return false
        var comp = password[0].toInt()
        for (i in 1 until password.length) {
            val next = password[i].toInt()
            if (next < comp) return false
            comp = next
        }
        return true
    }

    private fun count(regex: Regex): String {
        var count = 0
        for (i in min..max) {
            if (valid(i.toString(), regex)) count += 1
        }
        return count.toString()
    }

    override fun part1(): String = count(repeatingRegex)

    override fun part2(): String = count(exactly2Regex)

}
