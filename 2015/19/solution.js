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

/*
  Due to a special nature of the inputs -- there exist components that only exist
  at the RIGHT end of a larger molecule string -- we should reduce with our rightmost matches first.
  For example, in my input: "Ar" only exists at the right end of each replacer (ie: H => CRnMgYFAr).
  This is significantly faster than just matching the first option.
  Combining this with a depth-first greedy replacement (longest reductions first), we arrive
  at a solution quickly.

  NOTE: there is only one actual solution length, so arriving at any solution
  is fine. You'll get the right answer regardless.
*/
const findSolution = (replacers, molecule, path = []) => {
  for (let i = 0; i < replacers.length; i++) {
    const [ replacement, match ] = replacers[i]
    const reductions = replacements(match, replacement, molecule)
    if (reductions.length > 0) {
      const reducedMolecule = reductions[reductions.length - 1]
      const operation = `${match} => ${replacement}`
      const currentPath = path.concat(operation)
      if (reducedMolecule === 'e') {
        return currentPath
      } else {
        const solution = findSolution(replacers, reducedMolecule, currentPath)
        if (solution) {
          return solution
        }
      }
    }
  }
  return false
}

const solve = (replacers, molecule) => {
  replacers.sort((a, b) => b[1].length - a[1].length)
  return findSolution(replacers, molecule).length
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
