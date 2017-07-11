const target = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1
}

let sues = []

const defineSue = (definition) => {
  const [ , id, properties ] = definition.match(/^Sue (\d+): (.*)$/)
  let sue = { id: id }
  properties.split(', ').forEach((property) => {
    const [ name, value ] = property.split(': ')
    sue[name] = parseInt(value)
  })
  sues.push(sue)
}

const equalityEliminator = (property, sue) => {
  return target[property] !== sue[property]
}

const bustedEliminator = (property, sue) => {
  if (property === 'cats' || property === 'trees') {
    return sue[property] <= target[property]
  } else if (property === 'pomeranians' || property === 'goldfish') {
    return sue[property] >= target[property]
  }
  return target[property] !== sue[property]
}

const eliminate = (eliminator, sue) => {
  const properties = Object.keys(target)
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i]
    if (typeof sue[property] !== "undefined" && eliminator(property, sue)) {
      return true
    }
  }
  return false
}

const solve = (eliminator) => {
  const remaining = sues.filter((sue) => !eliminate(eliminator, sue))
  return remaining[0].id
}

const report = () => {
  console.log('Part 1', solve(equalityEliminator))
  console.log('Part 2', solve(bustedEliminator))
}

require('readline').
    createInterface({ input: require('fs').createReadStream('input.txt') }).
    on('line', defineSue).
    on('close', report)
