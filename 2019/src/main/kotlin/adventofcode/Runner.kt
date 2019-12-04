package adventofcode

val solutions = listOf(
    Day1Solution::class,
    Day2Solution::class,
    Day3Solution::class
)

fun main(args : Array<String>) {
    println()
    println("==============================")
    println("Welcome to Advent of Code 2019")
    println("==============================")
    println()
    val day = args.firstOrNull()?.toInt() ?: return println("Provide day.")
    val solution = solutions[day - 1].java.newInstance()
    println("Part 1: ${solution.part1()}")
    println("Part 2: ${solution.part2()}")
    println()
}
