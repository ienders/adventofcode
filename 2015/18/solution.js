const parseRow = (line) => {
  let row = []
  for (let i = 0; i < line.length; i++) {
    switch(line.charAt(i)) {
      case '#':
        row.push(true)
        break
      case '.':
        row.push(false)
        break
    }
  }
  return row
}

const onNeighbors = (state, x, y) => {
  let total = 0
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i == 0 && j == 0) { continue }
      if ((state[x + i] || [])[y + j]) {
        total += 1
      }
    }
  }
  return total
}

const count = (state) => {
  let total = 0
  state.forEach((row) => {
    row.forEach((light) => { total += light ? 1 : 0 })
  })
  return total
}

const nextState = (state, x, y) => {
  const neighbors = onNeighbors(state, x, y)
  if (state[x][y]) {
    return neighbors === 2 || neighbors === 3
  } else {
    return neighbors === 3
  }
}

const setStuckLights = (state, stuckLights) => {
  stuckLights.forEach((light) => state[light[0]][light[1]] = true)
}

const cycle = (state) => {
  let next = []
  for (let x = 0; x < state.length; x++) {
    let row = []
    for (let y = 0; y < state[x].length; y++) {
      row.push(nextState(state, x, y))
    }
    next.push(row)
  }
  return next
}

const solve = (initial, stuckLights = []) => {
  let state = []
  for (let i = 0, len = initial.length; i < len; i++) {
    state[i] = initial[i].slice()
  }
  setStuckLights(state, stuckLights)
  for (let i = 0; i < 100; i++) {
    state = cycle(state)
    setStuckLights(state, stuckLights)
  }
  return count(state)
}

const report = (state) => {
  console.log('Part 1', solve(state))
  console.log('Part 1', solve(state, [[0, 0], [99, 0], [0, 99], [99, 99]]))
}

const run = () => {
  let state = []
  require('readline').
      createInterface({ input: require('fs').createReadStream('input.txt') }).
      on('line', (line) => state.push(parseRow(line))).
      on('close', () => report(state))
}

run()
