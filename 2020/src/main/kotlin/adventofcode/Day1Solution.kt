package adventofcode

/**
--- Day 1: Report Repair ---
After saving Christmas five years in a row, you've decided to take a vacation at a nice resort on a tropical
island. Surely, Christmas will go on without you.

The tropical island has its own currency and is entirely cash-only. The gold coins used there have a little
picture of a starfish; the locals just call them stars. None of the currency exchanges seem to have heard of
them, but somehow, you'll need to find fifty of these coins by the time you arrive so you can pay the deposit
on your room.

To save your vacation, you need to get all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar;
the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

Before you leave, the Elves in accounting just need you to fix your expense report (your puzzle input);
apparently, something isn't quite adding up.

Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.

For example, suppose your expense report contained the following:

1721
979
366
299
675
1456

In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together
produces 1721 * 299 = 514579, so the correct answer is 514579.

Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get
if you multiply them together?

--- Part Two ---
The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they
had left over from a past vacation. They offer you a second one if you can find three numbers in your
expense report that meet the same criteria.

Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying
them together produces the answer, 241861950.

In your expense report, what is the product of the three entries that sum to 2020?

 */
class Day1Solution : Solution(1) {

    companion object {
        private const val TARGET = 2020
    }

    private val expenses = inputLinesAsInts

    private fun findPair(list: List<Int>, target: Int = TARGET): Pair<Int, Int>? {
        val dict = mutableSetOf<Int>()
        list.forEach {
            if (dict.contains(target - it))
                return Pair(it, target - it)
            dict.add(it)
        }
        return null
    }

    private fun findTriple(list: List<Int>): Triple<Int, Int, Int>? {
        val scan = list.toMutableList()
        while (scan.isNotEmpty()) {
            val current = scan.removeFirst()
            findPair(scan, TARGET - current)?.let {
                return Triple(current, it.first, it.second)
            }
        }
        return null
    }

    override fun part1() = findPair(expenses)!!
        .let { it.first * it.second }
        .toString()

    override fun part2() = findTriple(expenses)!!
        .let { it.first * it.second * it.third }
        .toString()

}
