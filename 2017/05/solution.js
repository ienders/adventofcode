const standardIncrementor = () => 1

const fluctuatingIncrementor = (result) => result >= 3 ? -1 : 1

const readAndIncrement = (offsets, i, incrementor) => {
  let result = offsets[i]
  offsets[i] += incrementor(result)
  return result
}

const numSteps = (input, incrementor) => {
  const offsets = input.slice()
  let steps = 0, pos = 0
  while (true) {
    steps += 1
    pos += readAndIncrement(offsets, pos, incrementor)
    if (typeof offsets[pos] === 'undefined') return steps
  }
}

const input = require('fs').readFileSync('input.txt', 'utf8').split("\n").map(i => parseInt(i))

console.log('Part 1', numSteps(input, standardIncrementor))
console.log('Part 2', numSteps(input, fluctuatingIncrementor))
