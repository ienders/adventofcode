package adventofcode

/**

--- Day 9: Encoding Error ---
With your neighbor happily enjoying their video game, you turn your attention to an open data
port on the little screen in the seat in front of you.

Though the port is non-standard, you manage to connect it to your computer through the clever
use of several paperclips. Upon connection, the port outputs a series of numbers (your puzzle input).

The data appears to be encrypted with the eXchange-Masking Addition System (XMAS) which,
conveniently for you, is an old cypher with an important weakness.

XMAS starts by transmitting a preamble of 25 numbers. After that, each number you receive
should be the sum of any two of the 25 immediately previous numbers. The two numbers will
have different values, and there might be more than one such pair.

For example, suppose your preamble consists of the numbers 1 through 25 in a random order.
To be valid, the next number must be the sum of two of those numbers:

26 would be a valid next number, as it could be 1 plus 25 (or many other pairs, like 2 and 24).
49 would be a valid next number, as it is the sum of 24 and 25.
100 would not be valid; no two of the previous 25 numbers sum to 100.
50 would also not be valid; although 25 appears in the previous 25 numbers, the two numbers
in the pair must be different.

Suppose the 26th number is 45, and the first number (no longer an option, as it is more than
25 numbers ago) was 20. Now, for the next number to be valid, there needs to be some pair of
numbers among 1-19, 21-25, or 45 that add up to it:

26 would still be a valid next number, as 1 and 25 are still within the previous 25 numbers.
65 would not be valid, as no two of the available numbers sum to it.
64 and 66 would both be valid, as they are the result of 19+45 and 21+45 respectively.

Here is a larger example which only considers the previous 5 numbers (and has a preamble of length 5):

35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576

In this example, after the 5-number preamble, almost every number is the sum of two of the previous
5 numbers; the only number that does not follow this rule is 127.

The first step of attacking the weakness in the XMAS data is to find the first number in the list
(after the preamble) which is not the sum of two of the 25 numbers before it. What is the first
number that does not have this property?

--- Part Two ---
The final step in breaking the XMAS encryption relies on the invalid number you just found:
you must find a contiguous set of at least two numbers in your list which sum to the invalid
number from step 1.

Again consider the above example:

35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576

In this list, adding up all of the numbers from 15 through 40 produces the invalid number from step
1, 127. (Of course, the contiguous set of numbers in your actual list might be much longer.)

To find the encryption weakness, add together the smallest and largest number in this contiguous
range; in this example, these are 15 and 47, producing 62.

What is the encryption weakness in your XMAS-encrypted list of numbers?

 */
class Day9Solution : Solution(9) {

    private class State(inputs: List<Long>) {
        private val inputs = inputs.toMutableList()
        private val buffer = mutableListOf<Long>()
        private val set = mutableSetOf<Long>()

        fun pop() {
            inputs.removeFirstOrNull()?.let {
                buffer.add(it)
                set.add(it)
                if (buffer.size > 25) {
                    set.remove(buffer.removeFirst())
                }
            }
        }

        fun peek(): Long =
            inputs.first()

        fun findPair(target: Long): Pair<Long, Long>? {
            set.forEach {
                if (set.contains(target - it) && target - it != it)
                    return Pair(it, target - it)
            }
            return null
        }
    }

    private fun firstInvalidNumber(): Long {
        val state = State(inputs)
        repeat(25) {
            state.pop()
        }
        while (true) {
            val next = state.peek()
            if (state.findPair(next) == null)
                return next
            state.pop()
        }
    }

    private fun encryptionWeakness(): Long {
        for (i in inputs.indices) {
            var remainder = firstInvalidNumber
            val set = mutableSetOf<Long>()
            for (j in i until inputs.size) {
                remainder -= inputs[j]
                set.add(inputs[j])
                if (remainder == 0L) {
                    return (set.minOrNull() ?: 0) + (set.maxOrNull() ?: 0)
                } else if (remainder < 0) {
                    break
                }
            }
        }
        throw IllegalArgumentException()
    }

    private val inputs = inputLinesAsLongs
    private val firstInvalidNumber = firstInvalidNumber()

    override fun part1() = firstInvalidNumber.toString()

    override fun part2() = encryptionWeakness().toString()

}
