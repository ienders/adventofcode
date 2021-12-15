using System;
using System.Collections.Generic;
using System.Linq;

namespace AdventOfCode {
    public class Day4Solution : Solution {

        private class Board {
            private readonly int[,] _grid;
            private readonly bool[,] _marks;
            private readonly Dictionary<int, Tuple<int, int>> _numbers;

            public Board(int[][] grid) {
                var dim1 = grid.Length;
                var dim2 = grid[0].Length;

                _grid = new int[dim1, dim2];
                for (var i = 0; i < dim1; i++)
                    for (var j = 0; j < dim2; j++)
                        _grid[i, j] = grid[i][j];

                _marks = new bool[dim1, dim2];
                
                _numbers = new Dictionary<int, Tuple<int, int>>();
                for (var i = 0; i < _grid.GetLength(0); i++) {
                    for (var j = 0; j < _grid.GetLength(1); j++) {
                        _numbers.Add(_grid[i, j], new Tuple<int, int>(i, j));
                    }
                }
            }

            private bool RowComplete(int i) {
                for (var j = 0; j < _grid.GetLength(1); j++) {
                    if (!_marks[i, j]) return false;
                }
                return true;
            }
            
            private bool ColComplete(int j) {
                for (var i = 0; i < _grid.GetLength(0); i++) {
                    if (!_marks[i, j]) return false;
                }
                return true;
            }

            public bool Call(int number) {
                if (!_numbers.ContainsKey(number)) return false;
                var (i, j) = _numbers[number];
                _marks[i, j] = true;
                return RowComplete(i) || ColComplete(j);
            }

            public int Score(int number) {
                var sum = 0;
                for (var i = 0; i < _grid.GetLength(0); i++) {
                    for (var j = 0; j < _grid.GetLength(1); j++) {
                        if (!_marks[i, j]) sum += _grid[i, j];
                    }
                }
                return sum * number;
            }
        }
        
        private readonly int[] _numbersDrawn;
        private readonly Board[] _boards;
        
        public Day4Solution() : base(4) {
            var input = InputLines().ToList();
            var numBoards = (input.Count - 1) / 6;
            _numbersDrawn = input.First()
                .Split(',')
                .Select(int.Parse)
                .ToArray();

            _boards = new Board[numBoards];
            for (var i = 0; i < numBoards; i++) {
                var rows = input.GetRange(2 + i * 6, 5).ToArray();
                _boards[i] = new Board(
                    rows.Select(row =>
                        row.Split(' ')
                            .Where(col => col != "")
                            .Select(int.Parse)
                            .ToArray()
                    ).ToArray()
                );
            }
        }

        public override string Part1() {
            foreach (var number in _numbersDrawn) {
                foreach (var board in _boards) {
                    if (board.Call(number)) {
                        return board.Score(number).ToString();
                    }
                }
            }

            throw new InvalidOperationException();
        }

        public override string Part2() {
            var boards = _boards.ToList();
            
            foreach (var number in _numbersDrawn) {
                for (var i = boards.Count - 1; i >= 0; i--) {
                    if (!boards[i].Call(number)) continue;
                    if (boards.Count == 1)
                        return boards[i].Score(number).ToString();
                    boards.RemoveAt(i);
                }
            }
            
            throw new InvalidOperationException();
        }
    }
}