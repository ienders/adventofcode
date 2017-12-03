function spiral(n, minAdjacentSum) {

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

  let x = 0, y = 0, d = 1, m = 1, i = 0
  OUTER: while (true) {
    while (2 * x * d < m) {
      x = x + d
      i += 1

      if (minAdjacentSum) {
        let val = store(x, y)
        if (val > minAdjacentSum) return val
      }
      if (i >= n) break OUTER
    }
    while (2 * y * d < m) {
      y = y + d
      i += 1
      if (minAdjacentSum) {
        let val = store(x, y)
        if (val > minAdjacentSum) return val
      }
      if (i >= n) break OUTER
    }
    d = -1 * d
    m = m + 1
  }
  return Math.abs(x) + Math.abs(y) - 1
}

const input = parseInt(require('fs').readFileSync('input.txt', 'utf8'))

console.log('Part 1', spiral(input))
console.log('Part 2', spiral(input, input))
