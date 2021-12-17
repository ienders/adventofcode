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

        protected int[,] InputAsIntGrid() {
            var input = InputLines();
            var sizeX = input.Length;
            var sizeY = input[0].Length;
            var grid = new int[sizeX, sizeY];
            for (var x = 0; x < sizeX; x++) {
                var row = input[x].ToCharArray().Select(c => c - '0').ToArray();
                for (var y = 0; y < sizeY; y++) {
                    grid[x, y] = row[y];
                }
            }
            return grid;
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