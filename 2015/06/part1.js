const INSTRUCTION_MATCHER = /^(.*) (\d+),(\d+) through (\d+),(\d+)$/

const input = require('fs').createReadStream('input.txt')
const reader = require('readline').createInterface({ input })

let lights = []

const numLightsOn = () => {
  let total = 0
  lights.forEach((row) => {
    row.forEach((light) => { total += light ? 1 : 0 })
  })
  return total
}

const turnOn = (x, y) => {
  if (!lights[x]) { lights[x] = [] }
  lights[x][y] = true
}

const turnOff = (x, y) => {
  if (!lights[x]) { lights[x] = [] }
  lights[x][y] = false
}

const toggle = (x, y) => {
  return (lights[x] || [])[y] ? turnOff(x, y) : turnOn(x, y)
}

const dispatchInstruction = (line) => {
  let [, instruction, x1, y1, x2, y2 ] = line.match(INSTRUCTION_MATCHER) || []
  let instructionFn = ((instruction) => {
    switch (instruction) {
      case 'turn on':
         return turnOn
      case 'turn off':
        return turnOff
      case 'toggle':
        return toggle
      default:
        throw `Unexpected instruction: ${instruction} [input = "${line}"]`
    }
  })(instruction)

  x1 = parseInt(x1)
  x2 = parseInt(x2)
  y1 = parseInt(y1)
  y2 = parseInt(y2)
  
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      instructionFn(x, y)
    }
  }
}

reader.on('line', dispatchInstruction)
reader.on('close', () => console.log(`${numLightsOn()} lights are on.`))
