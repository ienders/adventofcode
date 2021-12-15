using System;
using System.Linq;

namespace AdventOfCode {
    public class Day7Solution : Solution {

        private readonly int[] _positions;
        
        public Day7Solution() : base(7) {
            _positions = InputFirstLineAsIntArray();
        }

        private int Simulate(Func<int, int> fuelBurn) {
            var min = _positions.Min();
            var max = _positions.Max();

            var minFuel = int.MaxValue;

            for (var pos = min; pos <= max; pos++) {
                var fuel = _positions.Sum(crab => fuelBurn.Invoke(Math.Abs(pos - crab)));
                if (fuel < minFuel) minFuel = fuel;
            }

            return minFuel;   
        }
        
        public override string Part1() {
            return Simulate(dist => dist).ToString();
        }

        public override string Part2() {
            return Simulate(dist => (dist + 1) * dist / 2).ToString();
        }
    }
}