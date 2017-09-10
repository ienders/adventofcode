const replacements = (match, replacement, string) => {
  const options = []
  string.replace(
    new RegExp(match, 'g'),
    (match, offset, str) => options.push(
      str.substring(0, offset) +
        replacement +
        str.substring(offset + match.length)
    )
  )
  return options
}

const calibrate = (replacers, molecule) => {
  const molecules = {}
  replacers.forEach((replacer) => {
    const [ match, replacement ] = replacer
    replacements(match, replacement, molecule).forEach((str) => {
      molecules[str] = true
    })
  })
  return Object.keys(molecules).length
}

let deadends = {}

const solutions = (replacers, molecule, level) => {
  if (deadends[molecule]) {
    // console.log(deadends)
    return []
  }
  const possibleSteps = []
  replacers.forEach((replacer) => {
    const [ replacement, match ] = replacer
    replacements(match, replacement, molecule).forEach((str) => {
      possibleSteps.push([ `${match} => ${replacement}`, str ])
    })
  })
  if (possibleSteps.length === 0) {
    deadends[molecule] = true
    return []
  }
  const sols = []
  let steps = possibleSteps.length
  for (let i = 0; i < steps; i++) {
    const step = possibleSteps[i]
    if (level < 170) {
      console.log(`level ${level}: ${i} of ${steps}`)
    }
    if (step[1] === 'e') {
      sols.push(step[0])
    } else {
      const subsols = solutions(replacers, step[1], level + 1)
      if (subsols.length === 0) {
        deadends[step[1]] = true
        // console.log(deadends)
        continue
      }
      subsols.forEach((solution) => {
        sols.push([ step[0] ].concat(solution))
      })
    }
  }
  return sols
}

const solve = (replacers, molecule) => {
  const sols = solutions(replacers, molecule, 1)
  console.log('deadended main molecule', deadends[molecule])
  console.log(sols)
  return sols.length
}

const report = (replacers, molecule) => {
  console.log('Part 1', calibrate(replacers, molecule))
  console.log('Part 2', solve(replacers, molecule))
}

const run = () => {
  let replacers = [], molecule
  require('readline').
      createInterface({ input: require('fs').createReadStream('input.txt') }).
      on('line', (line) => {
        if (line.match(/=>/)) {
          const [ match, replacement ] = line.split(' => ')
          replacers.push([ match, replacement ])
        } else if (line !== '') {
          molecule = line
        }
      }).
      on('close', () => report(replacers, molecule))
}

run()
