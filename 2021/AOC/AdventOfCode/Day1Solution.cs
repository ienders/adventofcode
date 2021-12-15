using System;
using System.Linq;

namespace AdventOfCode {
    public class Day1Solution : Solution {
        
        private readonly int[] _input;

        public Day1Solution() : base(1) {
            _input = InputLinesAsInts();
        }
        
        private int SegmentDepth(int offset, int sliceSize) {
            return new ArraySegment<int>(_input, offset, sliceSize).Sum();
        }

        private int CountSegmentDepthIncreases(int sliceSize) {
            var segmentDepth = SegmentDepth(0, sliceSize);
            var count = 0;
            for (var i = 1; i < _input.Length - sliceSize + 1; i++) {
                var next = SegmentDepth(i, sliceSize);
                if (next > segmentDepth) count++;
                segmentDepth = next;
            }
            return count;
        }

        public override string Part1() {
            return CountSegmentDepthIncreases(1).ToString();
        }

        public override string Part2() {
            return CountSegmentDepthIncreases(3).ToString();
        }
    }
}