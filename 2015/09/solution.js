let distances = {}

const processInputLine = (line) => {
  let [, src, dest, dist] = line.match(/^(.*) to (.*) = (\d+)$/)
  dist = parseInt(dist)
  if (!distances[src]) distances[src] = {}
  if (!distances[dest]) distances[dest] = {}
  distances[src][dest] = dist
  distances[dest][src] = dist
}

const permuteDestinations = (destinations) => {
  if (destinations.length <= 1) return destinations
  let result = []
  for (let i = 0; i < destinations.length; i++) {
    const destination = destinations[i]
    destinations.splice(i, 1)
    permuteDestinations(destinations).forEach((permutation) => {
      result.push([ destination ].concat(permutation))
    })
    destinations.splice(i, 0, destination)
  }
  return result
}

const pathLength = (path) => {
  let length = 0
  for (let i = 1; i < path.length; i++) {
    length += distances[path[i - 1]][path[i]]
  }
  return length
}

const solve = () => {
  let minPathLength, maxPathLength
  permuteDestinations(Object.keys(distances)).forEach((path) => {
    const length = pathLength(path)
    if (!minPathLength || minPathLength > length) {
      minPathLength = length
    }
    if (!maxPathLength || maxPathLength < length) {
      maxPathLength = length
    }
  })
  console.log(`Part 1 (Min Path): ${minPathLength}`)
  console.log(`Part 2 (Max Path): ${maxPathLength}`)
}

require('readline').
    createInterface({ input: require('fs').createReadStream('input.txt') }).
    on('line', processInputLine).
    on('close', solve)
