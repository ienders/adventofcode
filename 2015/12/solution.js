const solve = (node, excludeObjectsWithValue) => {
  let nodeValue = 0
  if (typeof node === 'number') {
    return node
  } else if (typeof node === 'object') {
    if (Array.isArray(node)) {
      node.forEach((value) => nodeValue += solve(value, excludeObjectsWithValue))
    } else {
      const values = Object.values(node)
      for (let i = 0; i < values.length; i++) {
        if (excludeObjectsWithValue && values[i] === excludeObjectsWithValue) {
          return 0
        }
        nodeValue += solve(values[i], excludeObjectsWithValue)
      }
    }
  }
  return nodeValue
}

const input = require('fs').readFileSync('input.txt', 'utf8')
const json = JSON.parse(input)

console.log(solve(json))
console.log(solve(json, 'red'))
