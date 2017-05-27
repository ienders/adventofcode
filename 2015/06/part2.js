const INSTRUCTION_MATCHER = /^(.*) (\d+),(\d+) through (\d+),(\d+)$/

const input = require('fs').createReadStream('input.txt')
const reader = require('readline').createInterface({ input })

let lights = []

const totalBrightness = () => {
  let total = 0
  lights.forEach((row) => {
    row.forEach((light) => { total += light ? light : 0 })
  })
  return total
}

const adjustLight = (x, y, brightness) => {
  if (!lights[x]) { lights[x] = [] }
  if (!lights[x][y]) { lights[x][y] = 0 }
  lights[x][y] = Math.max(0, lights[x][y] + brightness)
}

const turnOn = (x, y) => adjustLight(x, y, 1)

const turnOff = (x, y) => adjustLight(x, y, -1)

const toggle = (x, y) => adjustLight(x, y, 2)

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

  x1 = parseInt(x1, 10)
  x2 = parseInt(x2, 10)
  y1 = parseInt(y1, 10)
  y2 = parseInt(y2, 10)
  
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      instructionFn(x, y)
    }
  }
}

reader.on('line', dispatchInstruction)
reader.on('close', () => console.log(`Total brightness is ${totalBrightness()}.`))
