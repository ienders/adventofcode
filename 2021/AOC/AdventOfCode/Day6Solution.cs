using System.Collections.Generic;
using System.Linq;

namespace AdventOfCode {
    public class Day6Solution : Solution {

        public Day6Solution() : base(6) {
        }

        private Dictionary<int, long> LoadFish() {
            var fish = InputFirstLineAsIntArray()
                .GroupBy(age => age)
                .ToDictionary(g => g.Key, g => (long) g.Count());

            for (var i = 0; i <= 8; i++)
                if (!fish.ContainsKey(i))
                    fish[i] = 0;
            
            return fish;
        }
        
        private long Simulate(int days) {
            var fish = LoadFish();
            for (var day = 0; day < days; day++) {
                var next = new Dictionary<int, long>();

                for (var i = 1; i <= 8; i++)
                    next[i - 1] = fish[i];

                next[8] = fish[0];
                next[6] += fish[0];

                fish = next;
            }
            return fish.Values.Sum();
        }

        public override string Part1() {
            return Simulate(80).ToString();
        }

        public override string Part2() {
            return Simulate(256).ToString();
        }
    }
}