const packages = []

const quantumEnganglement = (group) => group.reduce((product, pkg) => product * pkg, 1)

const pick = (items, target) => {
  const permutations = []
  for (let i = 0; i < items.length; i++) {
    if (items[i] === target) {
      permutations.push([ items[i] ])
    } else if (items[i] < target && i !== items.length - 1) {
      pick(items.slice(i + 1), target - items[i]).forEach((result) => {
        permutations.push([ items[i] ].concat(result))
      })
    }
  }
  return permutations
}

const solve = (divideInto) => {
  const target = packages.reduce((sum, pkg) => sum + pkg) / divideInto
  const groups = pick(packages, target).sort((a, b) => {
    if (a.length < b.length) return -1
    if (a.length > b.length) return 1
    return quantumEnganglement(a) - quantumEnganglement(b)
  })
  return quantumEnganglement(groups[0])
}

const report = () => {
  console.log('Part 1', solve(3))
  console.log('Part 2', solve(4))
}

require('readline').
    createInterface({ input: require('fs').createReadStream('input.txt') }).
    on('line', (line) => packages.push(parseInt(line))).
    on('close', report)
