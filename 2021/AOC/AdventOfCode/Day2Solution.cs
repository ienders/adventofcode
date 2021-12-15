using System;

namespace AdventOfCode {
    public class Day2Solution : Solution {

        public Day2Solution() : base(2) {
        }

        private void Navigate(Action<int> forward, Action<int> down, Action<int> up) {
            foreach (var line in InputLines()) {
                var instruction = line.Split(' ');
                var direction = instruction[0];
                var amount = int.Parse(instruction[1]);
                switch (direction) {
                    case "forward":
                        forward.Invoke(amount);
                        break;
                    case "down":
                        down.Invoke(amount);
                        break;
                    case "up":
                        up.Invoke(amount);
                        break;
                }
            }
        }

        public override string Part1() {
            int xPos = 0, depth = 0;

            Action<int> forward = amount => xPos += amount;
            Action<int> down = amount => depth += amount;
            Action<int> up = amount => depth -= amount;
            
            Navigate(forward, down, up);

            return (xPos * depth).ToString();
        }

        public override string Part2() {
            int xPos = 0, depth = 0, aim = 0;

            Action<int> forward = amount => {
                xPos += amount;
                depth += amount * aim;
            };
            Action<int> down = amount => aim += amount;
            Action<int> up = amount => aim -= amount;

            Navigate(forward, down, up);
            
            return (xPos * depth).ToString();
        }
    }
}