let circuit = {}
let signals = {}

const evaluate = (definition) => {
  let match

  if (match = definition.match(/^(\w+)$/)) {
    return gate(match[1])
  }

  if (match = definition.match(/^NOT (\w+)$/)) {
    return ~ gate(match[1])
  }

  if (match = definition.match(/^(\w+) AND (\w+)$/)) {
    return gate(match[1]) & gate(match[2])
  }

  if (match = definition.match(/^(\w+) OR (\w+)$/)) {
    return gate(match[1]) | gate(match[2])
  }

  if (match = definition.match(/^(\w+) RSHIFT (\w+)$/)) {
    return gate(match[1]) >> gate(match[2])
  }

  if (match = definition.match(/^(\w+) LSHIFT (\w+)$/)) {
    return gate(match[1]) << gate(match[2])
  }

  throw `Unexpected definition: ${definition}`
}

const addGateToCircuit = (line) => {
  const [, definition, outGate] = line.match(/^(.*) -> (\w+)$/)
  circuit[outGate] = definition
}

const gate = (reference) => {
  const val = parseInt(reference)
  if (`${val}` === reference) return val
  if (typeof signals[reference] === 'undefined') {
    signals[reference] = evaluate(circuit[reference])
  }
  return signals[reference]
}

const input = require('fs').createReadStream('input.txt')
const reader = require('readline').createInterface({ input })

reader.on('line', addGateToCircuit)
reader.on('close', () => {
  const initialValue = gate('a')
  console.log(`Gate a initially receives signal of ${initialValue}`)
  signals = { b: initialValue } 
  console.log(`Overridding b to ${initialValue} and resetting the circuit, a receives ${gate('a')}`)
})
