using System;
using System.Collections.Generic;
using System.Linq;

namespace AdventOfCode {
    public class Day12Solution : Solution {

        private class Node {

            public readonly string Id;
            public readonly bool IsEnd;
            private readonly bool _isLarge;
            private readonly HashSet<Node> _neighbors;

            public Node(string id) {
                Id = id;
                _neighbors = new HashSet<Node>();
                _isLarge = id.ToUpper() == id;
                IsEnd = id == "end";
            }

            public void AddNeighbor(Node node) {
                _neighbors.Add(node);
            }

            public List<Node> EligibleNodes(List<string> path, Func<List<string>, string, bool> eligibilityFunc) {
                return _neighbors
                    .Where(n => n._isLarge || eligibilityFunc.Invoke(path, n.Id))
                    .ToList();
            }
        }

        private readonly Dictionary<string, Node> _nodes;
        private readonly Node _start;

        public Day12Solution() : base(12) {
            _nodes = new Dictionary<string, Node>();
            foreach (var line in InputLines()) {
                var components = line.Split('-');
                AddEdge(components[0], components[1]);
            }
            _start = _nodes["start"];
        }

        private Node GetNode(string id) {
            if (_nodes.ContainsKey(id)) return _nodes[id];
            return _nodes[id] = new Node(id);
        }

        private void AddEdge(string a, string b) {
            var nodeA = GetNode(a);
            var nodeB = GetNode(b);
            nodeA.AddNeighbor(nodeB);
            nodeB.AddNeighbor(nodeA);
        }

        private static int CountPathsToEnd(List<string> memo, Node current, Func<List<string>, string, bool> eligibilityFunc) {
            var path = memo.ToList();
            path.Add(current.Id);
            if (current.IsEnd) return 1;
            return current.EligibleNodes(path, eligibilityFunc)
                .Select(next => CountPathsToEnd(path, next, eligibilityFunc))
                .Sum();
        }

        public override string Part1() {
            return CountPathsToEnd(
                new List<string>(),
                _start,
                (path, id) => !path.Contains(id)
            ).ToString();
        }

        public override string Part2() {
            bool EligibilityFunc(List<string> path, string id) {
                if (id == _start.Id) return false;
                var counts = path.Where(n => n.ToUpper() != n)
                    .GroupBy(n => n)
                    .ToDictionary(g => g.Key, g => g.Count());
                return !counts.ContainsKey(id) || !counts.ContainsValue(2);
            }
            var count = CountPathsToEnd(new List<string>(), _start, EligibilityFunc);
            return count.ToString();
        }
    }
}