using System;
using System.Collections.Generic;
using System.Linq;

namespace AdventOfCode {
    public class Day5Solution : Solution {

        private readonly List<((int, int), (int, int))> _coords;
        private readonly int _maxX;
        private readonly int _maxY;
        
        public Day5Solution() : base(5) {
            _coords = new List<((int, int), (int, int))>();
            _maxX = 0;
            _maxY = 0;
            foreach (var line in  InputLines()) {
                string[] separators = { ",", " -> " };
                var coords = line.Split(separators, StringSplitOptions.RemoveEmptyEntries)
                    .Select(int.Parse)
                    .ToArray();
                _maxX = new[] { coords[0], coords[2], _maxX }.Max();
                _maxY = new[] { coords[1], coords[3], _maxY }.Max(); 
                _coords.Add(((coords[0], coords[1]), (coords[2], coords[3])));
            }
        }

        private int CountOverlappingPoints(Func<int, int, bool> stepFilter) {
            var grid = new int[_maxX + 1, _maxY + 1];
            var overlappingPoints = 0;
            foreach (var ((x1, y1), (x2, y2)) in _coords) {
                var xStep = x2 - x1 < 0 ? -1 : x2 - x1 > 0 ? 1 : 0;
                var yStep = y2 - y1 < 0 ? -1 : y2 - y1 > 0 ? 1 : 0;

                var x = x1 - xStep;
                var y = y1 - yStep;

                if (stepFilter.Invoke(xStep, yStep)) continue;

                do {
                    x += xStep;
                    y += yStep;
                    grid[x, y]++;
                    if (grid[x, y] == 2) overlappingPoints++;
                } while (x != x2 || y != y2);
            }
            return overlappingPoints;
        }

        public override string Part1() {
            return CountOverlappingPoints((xStep, yStep) => xStep != 0 && yStep != 0).ToString();
        }

        public override string Part2() {
            return CountOverlappingPoints((_, _) => false).ToString();
        }
    }
}