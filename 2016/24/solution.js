const clone = state => JSON.parse(JSON.stringify(state))

const findGoals = grid => {
  const goals = []
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y].match(/\d/)) goals.push({ id: grid[x][y], x, y })
    }
  }
  return goals
}

const pick = (items, n) => {
  if (n > items.length) return []
  if (n === 0) return [ [] ]
  if (n === items.length) return [ items ]
  const copy = [ ...items ]
  const first = copy.shift()
  const results = pick(copy, n)
  pick(copy, n - 1).forEach(result => results.push([ first ].concat(result)))
  return results
}

const permute = (goals) => {
  if (goals.length <= 1) return goals
  let result = []
  for (let i = 0; i < goals.length; i++) {
    const segment = goals[i]
    goals.splice(i, 1)
    permute(goals).forEach(perm => result.push([ segment ].concat(perm)))
    goals.splice(i, 0, segment)
  }
  return result
}

const optimalSegmentLength = (grid, initial, goal) => {
  let queue = [ initial ]
  let visited = {}
  while (queue.length) {
    let { x, y, steps } = clone(queue.pop())
    visited[`${x},${y}`] = true
    let current = grid[x][y]
    if (goal === current) {
      return steps
    }
    [ { x: x + 1, y }, { x: x - 1, y }, { x, y: y + 1 }, { x, y: y - 1 } ].forEach(move => {
      if (grid[move.x] && grid[move.x][move.y] && grid[move.x][move.y] !== '#' &&
         !visited[`${move.x},${move.y}`] &&
         !queue.find(state => move.x == state.x && move.y == state.y)) {
        queue.unshift({ ...move, steps: steps + 1 })
      }
    })
  }
}

const pathLength = (distances, path) => {
  let length = 0
  for (let i = 1; i < path.length; i++) {
    length += distances[path[i - 1]][path[i]]
  }
  return length
}

const solve = (grid, goals, returnBack = false) => {
  const distances = pick(goals, 2).reduce((memo, segment) => {
    const fromId = segment[0].id, toId = segment[1].id
    const length = optimalSegmentLength(grid, { steps: 0, x: segment[0].x, y: segment[0].y }, toId)

    memo[fromId] = memo[fromId] || {}
    memo[fromId][toId] = length
    memo[toId] = memo[toId] || {}
    memo[toId][fromId] = length
    return memo
  }, {})

  if (returnBack) goals.push(goals.find(goal => goal.id === '0'))

  const paths = permute(goals.map(goal => goal.id)).filter(list => {
    return list[0] == '0' && (!returnBack || list[list.length - 1] == '0')
  })
  
  return Math.min.apply(null, paths.map(path => pathLength(distances, path)))
}


const grid = require('fs').readFileSync('input.txt', 'utf8').split("\n").map(row => row.split(''))
const goals = findGoals(grid)

console.log(`Part 1: ${solve(grid, goals)}`)
console.log(`Part 2: ${solve(grid, goals, true)}`)
