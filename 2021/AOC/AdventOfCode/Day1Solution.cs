using System.Linq;

namespace AdventOfCode {
    public class Day1Solution : Solution {
        
        private readonly int[] input;

        public Day1Solution() : base(1) {
            input = InputLinesAsInts();
        }

        public override string Part1() {
            var depth = input[0];
            var count = 0;

            for (int i = 1; i < input.Length; i++) {
                if (input[i] > depth) count++;
                depth = input[i];
            }

            return count.ToString();
        }

        public override string Part2() {
            var depth = input[0] + input[1] + input[2];
            var count = 0;
            for (int i = 1; i < input.Length - 2; i++) {
                var next = input[i] + input[i + 1] + input[i + 2];
                if (next > depth) count++;
                depth = next;
            }

            return count.ToString();
        }
    }
}