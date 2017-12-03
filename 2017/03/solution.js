const maxIterationTerminator = target => {
  let i = 0
  return function(x, y) {
    i += 1
    return (i >= target) ? Math.abs(x) + Math.abs(y) - 1 : false
  }
}

const minAdjacentSumTerminator = target => {
  const grid = { '0,0': 1 }

  const store = (x, y) => {
    const key = `${x},${y}`
    if (!grid[key]) grid[key] = adjacentSum(x, y)
    return grid[key]
  }

  const val = (x, y) => grid[`${x},${y}`] || 0

  const adjacentSum = (x, y) => {
    return val(x - 1, y - 1) + val(x - 1, y) + val(x - 1, y + 1)
         + val(x, y - 1) + val(x, y + 1)
         + val(x + 1, y - 1) + val(x + 1, y) + val(x + 1, y + 1)
  }

  return function(x, y) {
    let val = store(x, y)
    return (val > target) ? val : false
  }
}

const spiral = terminator => {
  let x = 0, y = 0, direction = 1, ring = 1
  while (true) {
    while (2 * x * direction < ring) {
      x += direction
      const result = terminator(x, y)
      if (result) return result
    }
    while (2 * y * direction < ring) {
      y += direction
      const result = terminator(x, y)
      if (result) return result
    }
    direction = -1 * direction
    ring += 1
  }
}

const input = parseInt(require('fs').readFileSync('input.txt', 'utf8'))

console.log('Part 1', spiral(maxIterationTerminator(input)))
console.log('Part 2', spiral(minAdjacentSumTerminator(input)))
