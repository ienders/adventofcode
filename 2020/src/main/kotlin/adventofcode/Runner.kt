package adventofcode

val solutions = listOf(
    Day1Solution::class,
    Day2Solution::class,
    Day3Solution::class,
    Day4Solution::class,
    Day5Solution::class,
    Day6Solution::class,
    Day7Solution::class,
    Day8Solution::class,
    Day9Solution::class,
    Day10Solution::class,
    Day11Solution::class,
    Day12Solution::class,
    Day13Solution::class,
)

fun main(args : Array<String>) {
    println()
    println("==============================")
    println("Welcome to Advent of Code 2020")
    println("==============================")
    println()
    val day = args.firstOrNull()?.toInt() ?: return println("Provide day.")
    val solution = solutions[day - 1].java.newInstance()
    println("Part 1: ${solution.part1()}")
    println("Part 2: ${solution.part2()}")
    println()
}
