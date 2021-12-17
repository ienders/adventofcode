using System.Collections.Generic;

namespace AdventOfCode {
    public class Day11Solution : Solution {

        private class OctopusSimulator {
            private readonly int[,] _energyLevels;
            private readonly int _sizeX;
            private readonly int _sizeY;
            public readonly int NumOctopi;

            public OctopusSimulator(int[,] input) {
                _energyLevels = (int[,]) input.Clone();
                _sizeX = _energyLevels.GetLength(0);
                _sizeY = _energyLevels.GetLength(1);
                NumOctopi = _sizeX * _sizeY;
            }

            private void Flash((int, int) coord, Queue<(int, int)> pendingFlashes) {
                var (x, y) = coord;

                var neighbors = new (int, int)[] {
                    (x - 1, y - 1),
                    (x - 1, y),
                    (x, y - 1),
                    (x + 1, y + 1),
                    (x + 1, y),
                    (x, y + 1),
                    (x + 1, y - 1),
                    (x - 1, y + 1)
                };

                foreach (var (nX, nY) in neighbors) {
                    if (nX >= 0 && nY >= 0 && nX < _sizeX && nY < _sizeY)
                        Energize((nX, nY), pendingFlashes);
                }
            }

            private void Energize((int, int) coord, Queue<(int, int)> pendingFlashes) {
                var (x, y) = coord;
                _energyLevels[x, y]++;
                if (_energyLevels[x, y] == 10) pendingFlashes.Enqueue(coord);
            }

            public int StepAndCountFlashes() {
                var flashes = 0;
                var pendingFlashes = new Queue<(int, int)>();
                for (var x = 0; x < _energyLevels.GetLength(0); x++) {
                    for (var y = 0; y < _energyLevels.GetLength(1); y++) {
                        Energize((x, y), pendingFlashes);
                    }
                }

                while (pendingFlashes.Count > 0) {
                    var coord = pendingFlashes.Dequeue();
                    Flash(coord, pendingFlashes);
                    flashes++;
                }

                for (var x = 0; x < _energyLevels.GetLength(0); x++) {
                    for (var y = 0; y < _energyLevels.GetLength(1); y++) {
                        if (_energyLevels[x, y] > 9) _energyLevels[x, y] = 0;
                    }
                }

                return flashes;
            }
        }

        private readonly int[,] _input;
        
        public Day11Solution() : base(11) {
            _input = InputAsIntGrid();
        }

        public override string Part1() {
            var simulator = new OctopusSimulator(_input);
            var total = 0;
            for (var i = 0; i < 100; i++)
                total += simulator.StepAndCountFlashes();
            return total.ToString();
        }

        public override string Part2() {
            var simulator = new OctopusSimulator(_input);
            var step = 0;
            while (true) {
                step++;
                if (simulator.StepAndCountFlashes() == simulator.NumOctopi) {
                    return step.ToString();
                }
            }
        }
    }
}