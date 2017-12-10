const distance = state => {
  let total = 0, len = state.floors.length
  for (let i = 0; i < len; i++) {
    total += state.floors[i].length * (len - i - 1)
  }
  return total
}

const initialState = () => {
  const floors = [];
  const init = require('fs').readFileSync('input.txt', 'utf8').split("\n")
  for (let i = 0; i < init.length; i++) {
    floors[i] = [];
    const floorState = init[i];
    const matches = floorState.match(/^The .+ floor contains (.+)\.$/)
    const contents = matches[1]
    contents.replace('and ', '').split(', ').forEach(component => {
      if (component !== 'nothing relevant') {
        const [ element, type ] = component.replace('a ', '').split(' ')
        floors[i].push(element.substr(0, 1) + type.substr(0, 1))
      }
    })
  }
  const state = { steps: 0, elevator: 0, floors }
  state.distance = distance(state)
  return state
}

const validCombination = items => {
  const unmatched = { m: {}, g: {} }
  for (let item of items) {
    let element = item.substr(0, 1)
    let type = item.substr(1, 1)
    let matchingType = type === 'g' ? 'm' : 'g'
    if (unmatched[matchingType][element]) {
      delete unmatched[matchingType][element]
    } else {
      unmatched[type][element] = true
    }
  }
  return Object.keys(unmatched.m).length == 0 || Object.keys(unmatched.g).length == 0
}

const floorWithout = (floor, items) => floor.filter(i => items.indexOf(i) < 0)

const floorWith = (floor, items) => floor.concat(items)

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

const minNonEmptyFloor = state => {
  for (let i = 0; state.floors.length; i++) {
    if (state.floors[i].length > 0) {
      return i
    }
  }
}

const availableMoves = state => {
  const directions = []
  const minEmpty = minNonEmptyFloor(state)
  if (state.elevator < state.floors.length - 1) directions.push(1)
  if (state.elevator > minEmpty) directions.push(-1)
  const items = state.floors[state.elevator]
  const moves = []
  const pairs = pick(items, 2)
  const singles = pick(items, 1)
  directions.forEach(direction => {
    let combinations
    if (direction === -1) {
      combinations = singles
    } else if (minEmpty === state.elevator && pairs.length > 0) {
      combinations = pairs
    } else {
      combinations = pairs.concat(singles)
    }
    combinations.forEach(combination => {
      if (validCombination(floorWithout(state.floors[state.elevator], combination))
          && validCombination(floorWith(state.floors[state.elevator + direction], combination))) {
        moves.push([ direction, combination ])
      }
    })
  })
  return moves
}

const performMove = (state, move) => {
  const currLevel = state.elevator
  const nextLevel = currLevel + move[0]
  state.steps += 1
  state.floors[currLevel] = floorWithout(state.floors[currLevel], move[1])
  state.floors[nextLevel] = floorWith(state.floors[nextLevel], move[1]).sort()
  state.elevator = nextLevel
  state.distance = distance(state)
  return state
}

const clone = state => JSON.parse(JSON.stringify(state))

const visitKey = state => {
  const copy = clone(state)
  delete copy.steps
  delete copy.distance 
  const intmap = {}
  let int = 0
  for (let i = 0; i < copy.floors.length; i++) {
    for (let j = 0; j < copy.floors[i].length; j++) {
      let newInt
      const element = copy.floors[i][j].substr(0, 1)
      if (intmap[element]) {
        newInt = intmap[element]
      } else {
        newInt = int
        intmap[element] = int
        int += 1
      }
      copy.floors[i][j] = `${newInt}${copy.floors[i][j].substr(1, 1)}`
    }
  }
  return JSON.stringify(copy)
}

const frontier = (state, visited) => {
  const nextStates = []
  availableMoves(state).forEach(move => {
    const next = performMove(clone(state), move)
    const visitedKey = visitKey(next)
    if (!visited[visitedKey]) {
      nextStates.push(next)
      visited[visitedKey] = true
    }
  })
  return nextStates
}

const stateSort = (a, b) => {
  if (a.distance === b.distance) {
    return a.steps - b.steps
  } else {
    return a.distance - b.distance
  }
}

const solution = state => {
  const visited = {}
  let next = state
  let queue = []
  while (next.distance !== 0) {
    queue = queue.concat(frontier(next, visited)).sort(stateSort)
    next = queue.shift()
  }
  return next   
}

const part1Init = initialState()
console.log('Part 1', solution(part1Init).steps)

const part2Init = initialState()
part2Init.floors[0] = part2Init.floors[0].concat([ 'eg', 'em', 'dg', 'dm' ])
console.log('Part 2', solution(part2Init).steps)
