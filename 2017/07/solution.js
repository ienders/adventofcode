class Node {

  constructor(id, weight, childIds) {
    this.id = id
    this.weight = weight
    this.childIds = childIds
  }

  setParent(node) {
    this.parent = node
  }

  hydrateChildren(nodes) {
    this.children = this.childIds.map(id => nodes[id])
    this.children.forEach(child => child.setParent(this))
  }

  childWeights() {
    if (this.cweights) return this.cweights
    this.cweights = this.children.map(child => {
      return child.weight + child.childWeights().reduce((sum, weight) => {
        return sum + weight
      }, 0)
    })
    return this.cweights
  }

  weightIndices() {
    if (this.indices) return this.indices
    this.indices = {}
    const weights = this.childWeights()
    for (let i = 0; i < weights.length; i++) {
      const weight = weights[i]
      this.indices[weight] = this.indices[weight] || []
      this.indices[weight].push(i)
    }
    return this.indices
  }

  weightToBalance() {
    const indices = this.weightIndices()
    const good = Object.keys(indices).find(weight => indices[weight].length > 1)
    const bad = Object.keys(indices).find(weight => indices[weight].length === 1)
    return good - bad
  }

  unbalancedChild() {
    const indices = this.weightIndices()
    for (let weight in indices) {
      if (indices[weight].length === 1) {
        return this.children[indices[weight][0]]
      }
    }
    return undefined
  }

}

const buildTree = (input) => {
  let nodes = {}
  input.forEach(line => {
    const matches = line.match(/^(\w+) \((\d+)\)( -> (.*))?/)
    let [ , id, weight, , childIds ] = matches
    if (childIds) childIds = childIds.split(', ')
    nodes[id] = new Node(id, parseInt(weight), childIds || [])
  })
  for (let id in nodes) nodes[id].hydrateChildren(nodes)
  let currentNode = nodes[Object.keys(nodes)[0]]
  while (currentNode.parent) {
    currentNode = currentNode.parent
  }
  return currentNode
}

const weightToBalance = (rootNode) => {
  let unbalancedChild = rootNode.unbalancedChild()
  while (true) {
    let nextLevel = unbalancedChild.unbalancedChild()
    if (nextLevel) {
      unbalancedChild = nextLevel
    } else {
      return rootNode.weightToBalance() + unbalancedChild.weight
    }
  }
}

const input = require('fs').readFileSync('input.txt', 'utf8').split("\n")

const rootNode = buildTree(input)

console.log('Part 1', rootNode.id)
console.log('Part 2', weightToBalance(rootNode))
