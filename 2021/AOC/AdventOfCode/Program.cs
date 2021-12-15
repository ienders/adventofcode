using System;
using System.Linq;

namespace AdventOfCode {
    internal class Program {
        public static void Main(string[] args) {
            Console.WriteLine();
            Console.WriteLine("==============================");
            Console.WriteLine("Welcome to Advent of Code 2021");
            Console.WriteLine("==============================");
            Console.WriteLine();

            var day = args.FirstOrDefault();
            if (day == null) {
                Console.WriteLine("Provide day.");
                return;
            }

            Solution solution = short.Parse(day) switch {
                1 => new Day1Solution(),
                2 => new Day2Solution(),
                3 => new Day3Solution(),
                4 => new Day4Solution(),
                5 => new Day5Solution(),
                6 => new Day6Solution(),
                _ => throw new ArgumentOutOfRangeException()
            };

            Console.WriteLine("Part 1: {0}", solution.Part1());
            Console.WriteLine("Part 2: {0}", solution.Part2());
        }
    }
}