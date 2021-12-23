using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace AdventOfCode {
    public class Day13Solution : Solution {

        private readonly bool[,] _grid;
        private readonly (string axis, int value)[] _folds;
        
        public Day13Solution() : base(13) {
            var input = InputLines();
            var numCoords = Array.IndexOf(input, "");
            var maxX = 0;
            var maxY = 0;
            var coords = new (int, int)[numCoords];
            for (var i = 0; i < numCoords; i++) {
                var coord = input[i].Split(',').Select(int.Parse).ToArray();
                coords[i] = (coord[1], coord[0]);
                if (coord[1] > maxX) maxX = coord[1];
                if (coord[0] > maxY) maxY = coord[0];
            }

            _grid = new bool[maxX + 1, maxY + 1];
            foreach (var (x, y) in coords) {
                _grid[x, y] = true;
            }

            const string pattern = @"fold along (\w)=(\d+)";
            _folds = new (string, int)[input.Length - numCoords - 1];
            for (var i = numCoords + 1; i < input.Length; i++) {
                var match = Regex.Match(input[i], pattern);
                var axis = match.Groups[1].Captures[0].Value;
                var value = int.Parse(match.Groups[2].Captures[0].Value);
                _folds[i - numCoords - 1] = (axis, value);
            }
        }

        private static bool[,] ApplyFold(bool[,] grid, (string axis, int value) fold) {
            if (fold.axis == "x") {
                var next = new bool[grid.GetLength(0), fold.value];
                for (var y = 0; y < grid.GetLength(1); y++) {
                    if (y == fold.value) continue;
                    var nextY = y < fold.value ? y : -1 * y + 2 * fold.value;
                    for (var x = 0; x < grid.GetLength(0); x++) {
                        next[x, nextY] = grid[x, y] || next[x, nextY];
                    }
                }
                return next;
            } else {
                var next = new bool[fold.value, grid.GetLength(1)];
                for (var x = 0; x < grid.GetLength(0); x++) {
                    if (x == fold.value) continue;
                    var nextX = x < fold.value ? x : -1 * x + 2 * fold.value;
                    for (var y = 0; y < grid.GetLength(1); y++) {
                        next[nextX, y] = grid[x, y] || next[nextX, y];
                    }
                }
                return next;
            }
        }

        private int CountGrid(bool[,] grid) {
            var count = 0;
            for (var x = 0; x < grid.GetLength(0); x++) {
                for (var y = 0; y < grid.GetLength(1); y++) {
                    if (grid[x, y]) count++;
                }
            }
            return count;
        }

        private static string PrintGrid(bool[,] grid) {
            var result = "\n";
            for (var x = 0; x < grid.GetLength(0); x++) {
                for (var y = 0; y < grid.GetLength(1); y++) {
                    result += grid[x,y] ? "█" : " ";
                }

                result += "\n";
            }

            return result;
        }
        
        public override string Part1() {
            return CountGrid(ApplyFold(_grid, _folds[0])).ToString();
        }

        public override string Part2() {
            var grid = _grid;
            foreach (var fold in _folds) {
                grid = ApplyFold(grid, fold);
            }
            return PrintGrid(grid);
        }
    }
}