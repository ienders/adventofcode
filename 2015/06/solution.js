const solve = (toggleOnAdjustment, toggleOffAdjustment, maxBrightness = undefined) => {

  const INSTRUCTION_MATCHER = /^(.*) (\d+),(\d+) through (\d+),(\d+)$/

  let lights = []

  const sumBrightness = () => {
    let total = 0
    lights.forEach((row) => {
      row.forEach((light) => { total += light ? light : 0 })
    })
    return total
  }

  const brightness = (x, y) => {
    const value = (lights[x] || [])[y]
    return value ? value : 0
  }

  const adjust = (x, y, brightness) => {
    if (!lights[x]) { lights[x] = [] }
    if (!lights[x][y]) { lights[x][y] = 0 }
    let value = Math.max(0, lights[x][y] + brightness)
    if (maxBrightness) {
      value = Math.min(value, maxBrightness)
    }
    lights[x][y] = value
  }

  const turnOn = (x, y) => adjust(x, y, 1)

  const turnOff = (x, y) => adjust(x, y, -1)

  const toggle = (x, y) => {
    const lightOn = brightness(x, y) > 0
    adjust(x, y, lightOn ? toggleOffAdjustment : toggleOnAdjustment)
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

  const report = () => { console.log(`Total brightness is ${sumBrightness()}`) }

  require('readline').
      createInterface({ input: require('fs').createReadStream('input.txt') }).
      on('line', dispatchInstruction).
      on('close', report)
}

solve(1, -1, 1)
solve(2, 2)
