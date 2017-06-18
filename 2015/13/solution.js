let rules = {}

const addRule = (line) => {
  const matcher = /^(.*) would (lose|gain) (\d+) happiness units? by sitting next to (.*)\.$/
  let [ , person, action, happiness, neighbour ] = line.match(matcher)
  if (!rules[person]) rules[person] = {}
  rules[person][neighbour] = parseInt(happiness) * (action === 'lose' ? -1 : 1)
}

const permuteSeats = (people) => {
  if (people.length <= 1) return people
  let result = []
  for (let i = 0; i < people.length; i++) {
    const person = people[i]
    people.splice(i, 1)
    permuteSeats(people).forEach((permutation) => {
      result.push([ person ].concat(permutation))
    })
    people.splice(i, 0, person)
  }
  return result
}

const happiness = (person, neighbour) => (rules[person] || {})[neighbour] || 0

const pairHappiness = (person1, person2) => {
  return happiness(person1, person2) + happiness(person2, person1)
}

const permutationHappiness = (people) => {
  let happiness = 0
  for (let i = 0; i < people.length - 1; i++) {
    happiness += pairHappiness(people[i], people[i + 1])
  }
  happiness += pairHappiness(people[people.length - 1], people[0])
  return happiness
}

const solve = (additionalPeople = []) => {
  let maxHappiness = 0
  permuteSeats(Object.keys(rules).concat(additionalPeople)).forEach((permutation) => {
    const happiness = permutationHappiness(permutation)
    if (happiness > maxHappiness) {
      maxHappiness = happiness
    }
  })
  return maxHappiness
}

const report = () => {
  console.log('Part 1', solve())
  console.log('Part 2', solve([ 'Ian' ]))
}

require('readline').
    createInterface({ input: require('fs').createReadStream('input.txt') }).
    on('line', addRule).
    on('close', report)
