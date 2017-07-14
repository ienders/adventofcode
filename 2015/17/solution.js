let containers = []

const defineContainer = (line) => {
  containers.push(parseInt(line))
}

const solve = (list, target, len) => {
  const useLen = typeof len !== "undefined"
  if (target < 0) { return 0 }
  if (target === 0 && (!useLen || len === 0)) {
    return 1
  }
  const size = list[0]
  if (list.length === 1) {
    return target === size && (!useLen || len === 1) ? 1 : 0
  }
  const remainder = list.slice().splice(1)
  return solve(remainder, target, len) +
         solve(remainder, target - size, useLen ? len - 1 : undefined)
}

const minLengthSolution = () => {
  for (let i = 1; i < containers.length; i++) {
    const solutions = solve(containers, 150, i)
    if (solutions > 0) {
      return [ i, solutions ]
    }
  }
}

const report = () => {
  containers.sort((a, b) => b - a)
  console.log('Part 1', solve(containers, 150))
  console.log('Part 2', minLengthSolution())
}

require('readline').
    createInterface({ input: require('fs').createReadStream('input.txt') }).
    on('line', defineContainer).
    on('close', report)
