using System;
using System.Linq;

namespace AdventOfCode {
    public class Day3Solution : Solution {

        private readonly char[][] _input;
        private readonly int _numBits;

        public Day3Solution() : base(3) {
            _input = InputLines().Select(line => line.ToCharArray()).ToArray();
            _numBits = _input[0].Length;
        }
        
        private static char[] BitsOrderedByCountDesc(char[][] input, int pos) {
            return input
                .Select(line => line[pos])
                .GroupBy(bit => bit)
                .OrderByDescending(g => g.Count())
                .ThenByDescending(g => g.Key)
                .Select(g => g.Key)
                .ToArray();
        }

        private static int ToInt32(char[] acc) {
            return Convert.ToInt32(new string(acc), 2);
        }

        private int CollectForPowerConsumption(Func<char[], char> select) {
            var acc = new char[_numBits];
            for (var i = 0; i < _numBits; i++) {
                acc[i] = select(BitsOrderedByCountDesc(_input, i));
            }
            return ToInt32(acc);
        }
        
        private int CollectForLifeSupportRating(Func<char[], char> select) {
            var candidates = _input;
            var pos = 0;
            while (candidates.Length > 1) {
                var bit = select(BitsOrderedByCountDesc(candidates, pos));
                candidates = candidates
                    .Where(line => line[pos] == bit)
                    .ToArray();
                pos++;
            }
            return ToInt32(candidates.First());
        }
        
        private int Gamma() {
            return CollectForPowerConsumption(bits => bits.First());
        }
        
        private int Epsilon() {
            return CollectForPowerConsumption(bits => bits.Last());
        }

        private int OxygenGeneratorRating() {
            return CollectForLifeSupportRating(bits => bits.First());
        }

        private int Co2ScrubberRating() {
            return CollectForLifeSupportRating(bits => bits.Last());
        }

        public override string Part1() {
            return (Gamma() * Epsilon()).ToString();
        }

        public override string Part2() {
            return (OxygenGeneratorRating() * Co2ScrubberRating()).ToString();
        }
    }
}