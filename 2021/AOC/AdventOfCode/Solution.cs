using System.IO;
using System.Linq;

namespace AdventOfCode {
    public abstract class Solution {

        private readonly string filepath;

        protected Solution(int day) {
            filepath = Directory.GetCurrentDirectory() + $"/Input/day{day}.txt";
        }

        protected string[] InputLines() {
            return File.ReadLines(filepath).ToArray();
        }

        protected int[] InputFirstLineAsIntArray() {
            return InputLines()
                .First()
                .Split(',')
                .Select(int.Parse)
                .ToArray();
        }

        protected int[] InputLinesAsInts() {
            return InputLines().Select(int.Parse).ToArray();
        }

        protected long[] InputLinesAsLongs() {
            return InputLines().Select(long.Parse).ToArray();
        }

        protected string InputAsString() {
            return InputLines().First();
        }

        public abstract string Part1();
        public abstract string Part2();
    }
}