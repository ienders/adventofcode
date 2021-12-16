using System;
using System.Collections.Generic;
using System.Linq;

namespace AdventOfCode {
    public class Day8Solution : Solution {

        private readonly string[][] _input; 
        
        public Day8Solution() : base(8) {
            _input = InputLines()
                .Select(line => 
                    line.Split(new[] {" ", "|"}, StringSplitOptions.RemoveEmptyEntries)
                )
                .ToArray();
        }

        private static int Intersects(HashSet<char> digit, HashSet<char> comparison) {
            return digit.Intersect(comparison).Count();
        }
        
        private int Decode(string[] input) {
            var hashed = input.Select(d => d.ToCharArray().ToHashSet()).ToArray();
            var digits = hashed.Take(10).ToArray();

            var one = digits.First(d => d.Count == 2);
            var four = digits.First(d => d.Count == 4);

            var decoded = hashed.Skip(10).Take(4).Select(digit =>
                digit.Count switch {
                    2 => 1,
                    3 => 7,
                    4 => 4,
                    5 => Intersects(digit, one) switch {
                        2 => 3,
                        _ => Intersects(digit, four) switch {
                            2 => 2,
                            _ => 5
                        }
                    },
                    6 => Intersects(digit, one) switch {
                        1 => 6,
                        _ => Intersects(digit, four) switch {
                            4 => 9,
                            _ => 0
                        }
                    },
                    _ => 8
                }
            );
            
            return int.Parse(string.Join("", decoded));
        }

        public override string Part1() {
            return _input.Sum(line =>
                line
                    .Skip(line.Length - 4)
                    .Count(digit => digit.Length < 5 || digit.Length == 7)
            ).ToString();
        }

        public override string Part2() {
            return _input.Select(Decode).Sum().ToString();
        }
    }
}
