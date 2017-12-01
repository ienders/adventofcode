const buttonInstructions = require('fs').readFileSync('input.txt', 'utf8').split("\n")

const directions = {
  U: { axis: 0, direction: -1 },
  D: { axis: 0, direction: 1 },
  L: { axis: 1, direction: -1 },
  R: { axis: 1, direction: 1 }
}

const solve = (keypad) => {
  let position = Object.keys(keypad).find(key => {
    return keypad[key] === '5'
  }).split(',').map(val => parseInt(val))

  let pattern = ''
  for (let button = 0; button < buttonInstructions.length; button++) {
    let moves = buttonInstructions[button].split('')
    moves.forEach(move => {
      const next = position.slice()
      const { axis, direction } = directions[move]
      next[axis] = next[axis] + direction
      if (keypad[`${next[0]},${next[1]}`]) position = next
    })
    pattern = `${pattern}${keypad[`${position[0]},${position[1]}`]}`
  }
  return pattern
}

console.log('Part 1', solve({
  '0,0': '1',
  '0,1': '2',
  '0,2': '3',
  '1,0': '4',
  '1,1': '5',
  '1,2': '6',
  '2,0': '7',
  '2,1': '8',
  '2,2': '9'
}))

console.log('Part 2', solve({
  '0,2': '1',
  '1,1': '2',
  '1,2': '3',
  '1,3': '4',
  '2,0': '5',
  '2,1': '6',
  '2,2': '7',
  '2,3': '8',
  '2,4': '9',
  '3,1': 'A',
  '3,2': 'B',
  '3,3': 'C',
  '4,2': 'D'
}))
