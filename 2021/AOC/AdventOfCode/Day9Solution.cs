using System;
using System.Collections.Generic;
using System.Linq;

namespace AdventOfCode {
    public class Day9Solution : Solution {

        private readonly int[,] _heightMap;
        private readonly List<(int, int)> _lowPoints;
        private readonly int _maxX;
        private readonly int _maxY;
        
        public Day9Solution() : base(9) {
            var input = InputLines();
            _heightMap = new int[input.Length, input[0].Length];
            _maxX = _heightMap.GetLength(0) - 1;
            _maxY = _heightMap.GetLength(1) - 1;

            for (var x = 0; x <= _maxX; x++) {
                var row = input[x].ToCharArray().Select(c => c - '0').ToArray();
                for (var y = 0; y <= _maxY; y++) {
                    _heightMap[x, y] = row[y];
                }
            }

            _lowPoints = new List<(int, int)>();
            for (var x = 0; x <= _maxX; x++)
                for (var y = 0; y <= _maxY; y++)
                    if (IsLowPoint(x, y)) _lowPoints.Add((x, y));
        }

        private bool IsLowPoint(int x, int y) {
            var height = _heightMap[x, y];
            return (x == 0 || _heightMap[x - 1, y] > height)
                   && (y == 0 || _heightMap[x, y - 1] > height)
                   && (x == _maxX || _heightMap[x + 1, y] > height)
                   && (y == _maxY || _heightMap[x, y + 1] > height);
        }

        private int RiskLevel((int x, int y) coord) {
            return _heightMap[coord.x, coord.y] + 1;
        }
        
        public override string Part1() {
            return _lowPoints.Select(RiskLevel).Sum().ToString();
        }
        
        public override string Part2() {
            var visited = new HashSet<(int, int)>();
            var queue = new Queue<((int, int), (int, int))>();
            var sizes = new Dictionary<(int, int), int>();
            var basins = new Dictionary<(int, int), List<(int, int)>>();
            foreach (var point in _lowPoints) {
                sizes[point] = 0;
                basins[point] = new List<(int, int)>();
                queue.Enqueue((point, point));
            }

            while (queue.Count > 0) {
                var (start, (x, y)) = queue.Dequeue();
                visited.Add((x, y));
                sizes[start]++;
                basins[start].Add((x, y));

                var shouldEnqueue = new Func<(int, int), bool>(((int x, int y) next) =>
                    next.x >= 0 && next.y >= 0 && next.x <= _maxX && next.y <= _maxY
                        && _heightMap[next.x, next.y] < 9 && !visited.Contains(next)
                        && !queue.Contains((start, next)));
                
                if (shouldEnqueue((x - 1, y))) queue.Enqueue((start, (x - 1, y)));
                if (shouldEnqueue((x, y - 1))) queue.Enqueue((start, (x, y - 1)));
                if (shouldEnqueue((x + 1, y))) queue.Enqueue((start, (x + 1, y)));
                if (shouldEnqueue((x, y + 1))) queue.Enqueue((start, (x, y + 1)));
            }

            return sizes.Values
                .OrderByDescending(size => size)
                .Take(3)
                .Aggregate((a, x) => a * x)
                .ToString();
        }
    }
}