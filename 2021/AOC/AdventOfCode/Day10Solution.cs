using System.Collections.Generic;
using System.Linq;

namespace AdventOfCode {
    public class Day10Solution : Solution {

        private readonly char[][] _input;

        private readonly Dictionary<char, char> _braces = new Dictionary<char, char> {
            { '(', ')' },
            { '[', ']' },
            { '{', '}' },
            { '<', '>' }
        };
        
        private readonly Dictionary<char, int> _syntaxSymbolScore = new Dictionary<char, int> {
            { ')', 3 },
            { ']', 57 },
            { '}', 1197 },
            { '>', 25137 }
        };
        
        private readonly Dictionary<char, int> _autocompleteSymbolScore = new Dictionary<char, int> {
            { ')', 1 },
            { ']', 2 },
            { '}', 3 },
            { '>', 4 }
        };

        public Day10Solution() : base(10) {
            _input = InputLines()
                .Select(row => row.ToCharArray())
                .ToArray();
        }

        private int SyntaxErrorScore(char[] row) {
            var stack = new Stack<char>();
            foreach (var symbol in row) {
                if (_braces.ContainsKey(symbol)) {
                    stack.Push(_braces[symbol]);
                } else if (stack.Pop() != symbol) {
                    return _syntaxSymbolScore[symbol];
                }
            }
            return 0;
        }
        
        private long AutocompleteScore(char[] row) {
            var stack = new Stack<char>();
            foreach (var symbol in row) {
                if (_braces.ContainsKey(symbol)) {
                    stack.Push(_braces[symbol]);
                } else if (stack.Pop() != symbol) {
                    return 0;
                }
            }
            long score = 0;
            while (stack.Count > 0) {
                score = score * 5 + _autocompleteSymbolScore[stack.Pop()];
            }
            return score;
        }

        public override string Part1() {
            return _input.Sum(SyntaxErrorScore).ToString();
        }

        public override string Part2() {
            var scores = _input.Select(AutocompleteScore)
                .Where(s => s > 0)
                .OrderBy(s => s)
                .ToArray();
            return scores[(scores.Length - 1) / 2].ToString();
        }
    }
}