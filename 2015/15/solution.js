let ingredients = {}

const rand = (max) => Math.floor(Math.random() * max)

const defineIngredient = (definition) => {
  const [ , ingredient, traits ] = definition.match(/^(.*): (.*)$/)
  ingredients[ingredient] = {}
  traits.split(', ').forEach((traitDefinition) => {
    const [ trait, value ] = traitDefinition.split(' ')
    ingredients[ingredient][trait] = parseInt(value)
  })
}

const combine = (c1, c2) => {
  let cookie = {}
  let teaspoonsRemaining = 100
  const ingredientList = Object.keys(ingredients)
  for (let i = 0; i < ingredientList.length - 1; i++) {
    const ingredient = ingredientList[i]
    const total = c1[ingredient] + c2[ingredient]
    const teaspoonsOfIngredient = total === 0 ? 0 : Math.floor(total / 2)
    cookie[ingredient] = teaspoonsOfIngredient
    teaspoonsRemaining -= teaspoonsOfIngredient
  }
  cookie[ingredientList[ingredientList.length - 1]] = teaspoonsRemaining
  return cookie
}

const mutate = (c, mutationFactor) => {
  let cookie = Object.assign({}, c)

  let ingredientList = Object.keys(ingredients)

  let ingredient1 = ingredientList.splice(rand(ingredientList.length), 1)
  let ingredient2 = ingredientList.splice(rand(ingredientList.length), 1)

  let maxAmount = Math.max(cookie[ingredient1], cookie[ingredient2])
  let mutation = Math.min(maxAmount, rand(mutationFactor))
  if (cookie[ingredient1] < cookie[ingredient2]) {
    mutation = -1 * mutation    
  }
  cookie[ingredient1] = cookie[ingredient1] - mutation
  cookie[ingredient2] = cookie[ingredient2] + mutation
  return cookie
}

const generateCookie = () => {
  let cookie = {}
  let teaspoonsRemaining = 100
  const ingredientList = Object.keys(ingredients)
  for (let i = 0; i < ingredientList.length - 1; i++) {
    const teaspoonsOfIngredient = rand(teaspoonsRemaining)
    cookie[ingredientList[i]] = teaspoonsOfIngredient
    teaspoonsRemaining -= teaspoonsOfIngredient
  }
  cookie[ingredientList[ingredientList.length - 1]] = teaspoonsRemaining
  return cookie
}

const fitnessWithoutCalories = (cookie) => {
  let totals = {}
  Object.keys(cookie).forEach((ingredient) => {
    const amount = cookie[ingredient]
    Object.keys(ingredients[ingredient]).forEach((trait) => {
      totals[trait] = (totals[trait] || 0) + ingredients[ingredient][trait] * amount
    })
  })
  delete totals['calories']
  return Object.values(totals).reduce((product, val) => product * Math.max(0, val), 1)
}

const fitnessWith500Calories = (cookie) => {
  let totals = {}
  Object.keys(cookie).forEach((ingredient) => {
    const amount = cookie[ingredient]
    Object.keys(ingredients[ingredient]).forEach((trait) => {
      totals[trait] = (totals[trait] || 0) + ingredients[ingredient][trait] * amount
    })
  })
  if (totals['calories'] !== 500) { return 0 }
  delete totals['calories']
  return Object.values(totals).reduce((product, val) => product * Math.max(0, val), 1)
}

const selectPairs = (cookies, slummingFactor) => {
  let remaining = cookies.slice()
  let pairs = []
  while (remaining.length > 1) {
    const c1 = remaining.splice(0, 1)
    const c2 = remaining.splice(Math.min(remaining.length - 1, rand(slummingFactor)), 1)
    pairs.push([ c1[0], c2[0] ])
  }
  return pairs
}

const solve = (
    fitnessFn, iterations, generations,
    initialSampleSize, geneticDiversity,
    slummingFactor, mutationFactor
) => {
  let best = [ {}, 0 ]
  for (let iteration = 0; iteration < iterations; iteration++) {
    let cookies = []
    for (let i = 0; i < initialSampleSize; i++) {
      const cookie = generateCookie()
      cookies.push([ cookie, fitnessFn(cookie) ])
    }
    cookies.sort((a, b) => b[1] - a[1])
    cookies = cookies.splice(0, geneticDiversity)
    for (let generation = 0; generation < generations; generation++) {
      const pairs = selectPairs(cookies, slummingFactor)
      pairs.forEach((pair) => {
        const cookie = mutate(combine(pair[0][0], pair[1][0]), mutationFactor)
        cookies.push([ cookie, fitnessFn(cookie) ])
      })
      cookies.sort((a, b) => b[1] - a[1])
      cookies.splice(cookies.length - pairs.length, pairs.length)
    }
    if (cookies[0][1] > best[1]) {
      best = cookies[0]
    }
  }
  return best[1]
}

const report = () => {
  console.log('Part 1', solve(fitnessWithoutCalories, 5, 10, 1000, 100, 3, 10))
  console.log('Part 2', solve(fitnessWith500Calories, 5, 100, 1000, 200, 3, 20))
}

require('readline').
    createInterface({ input: require('fs').createReadStream('input.txt') }).
    on('line', defineIngredient).
    on('close', report)
