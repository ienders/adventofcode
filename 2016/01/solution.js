const instructions = require('fs').readFileSync('input.txt', 'utf8').split(', ')

const dirs = [
  { axis: 1, direction: 1 },
  { axis: 0, direction: 1 },
  { axis: 1, direction: -1 },
  { axis: 0, direction: -1 }
]

const solve = (endOnRepeat = false) => {
  const position = [ 0, 0 ]
  const visited = {}
  let facing = 0

  const turn = (amount) => {
    facing = (facing + amount) % 4
    if (facing < 0) facing = 3
  }

  const distance = () => {
    return Math.abs(position[0]) + Math.abs(position[1])
  }

  for (let i = 0; i < instructions.length; i++) {
    const inst = instructions[i]
    if (inst.charAt(0) === 'L') {
      turn(-1)
    } else if (inst.charAt(0) === 'R') {
      turn(1)
    }
    const amount = parseInt(inst.substr(1))
    for (let i = 0; i < amount; i++) {
      position[dirs[facing].axis] += dirs[facing].direction * 1
      const key = `${position[0]},${position[1]}`
      if (endOnRepeat && visited[key]) return distance()
      visited[key] = true
    }
  }
  return distance()
}

console.log('Part 1', solve())
console.log('Part 2', solve(true))
