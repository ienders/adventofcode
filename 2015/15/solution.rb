class CookieFactory

  attr_accessor :ingregients,
    :iterations, :generations,
    :initial_sample_size, :genetic_diversity,
    :slumming_factor, :mutation_factor

  def initialize(options = {})
    @iterations = options[:iterations] || 5
    @generations = options[:generations] || 10
    @initial_sample_size = options[:initial_sample_size] || 1000
    @genetic_diversity = options[:genetic_diversity] || 100
    @slumming_factor = options[:slumming_factor] || 3
    @mutation_factor = options[:mutation_factor] || 10

    @ingredients = Hash.new do |hash, key|
      hash[key] = Hash.new
    end
    File.open('input.txt').each_line do |line|
      ingredient, traits = /^(.*): (.*)$/.match(line)[1..2]
      traits.split(', ').each do |defn|
        trait, value = defn.split(' ')
        @ingredients[ingredient][trait.to_sym] = value.to_i
      end
    end
  end

  def solve
    best = [ {}, 0 ]
    for (iteration = 0; iteration < iterations; iteration++) {
      cookies = []
      for (i = 0; i < initial_sample_size; i++) {
        cookie = generateCookie()
        cookies.push([ cookie, fitness(cookie) ])
      }
      cookies.sort((a, b) => b[1] - a[1])
      cookies = cookies.splice(0, genetic_diversity)
      for (generation = 0; generation < generations; generation++) {
        pairs = selectPairs(cookies, slumming_factor)
        pairs.forEach((pair) => {
          cookie = mutate(combine(pair[0][0], pair[1][0]))
          cookies.push([ cookie, fitness(cookie) ])
        })
        cookies.sort((a, b) => b[1] - a[1])
        cookies.splice(cookies.length - pairs.length, pairs.length)
      }
      if (cookies[0][1] > best[1]) {
        best = cookies[0]
      }
    }
    best[1]
  end

  protected
  def rand(max)
    Math.floor(Math.random() * max)
  end

  def combine(c1, c2)
    cookie = {}
    teaspoonsRemaining = 100
    ingredientList = Object.keys(ingredients)
    for (i = 0; i < ingredientList.length - 1; i++) {
      ingredient = ingredientList[i]
      total = c1[ingredient] + c2[ingredient]
      teaspoonsOfIngredient = total === 0 ? 0 : Math.floor(total / 2)
      cookie[ingredient] = teaspoonsOfIngredient
      teaspoonsRemaining -= teaspoonsOfIngredient
    }
    cookie[ingredientList[ingredientList.length - 1]] = teaspoonsRemaining
    cookie
  end

  def mutate(c)
    cookie = Object.assign({}, c)

    ingredientList = Object.keys(ingredients)

    ingredient1 = ingredientList.splice(rand(ingredientList.length), 1)
    ingredient2 = ingredientList.splice(rand(ingredientList.length), 1)

    maxAmount = Math.max(cookie[ingredient1], cookie[ingredient2])
    mutation = Math.min(maxAmount, rand(mutation_factor))
    if cookie[ingredient1] < cookie[ingredient2]
      mutation = -1 * mutation    
    end
    cookie[ingredient1] = cookie[ingredient1] - mutation
    cookie[ingredient2] = cookie[ingredient2] + mutation
    cookie
  end

  def generateCookie
    cookie = {}
    teaspoonsRemaining = 100
    ingredientList = Object.keys(ingredients)
    for (i = 0; i < ingredientList.length - 1; i++) {
      teaspoonsOfIngredient = rand(teaspoonsRemaining)
      cookie[ingredientList[i]] = teaspoonsOfIngredient
      teaspoonsRemaining -= teaspoonsOfIngredient
    }
    cookie[ingredientList[ingredientList.length - 1]] = teaspoonsRemaining
    cookie
  end

  def selectPairs(cookies, slumming_factor)
    remaining = cookies.slice()
    pairs = []
    while (remaining.length > 1) {
      c1 = remaining.splice(0, 1)
      c2 = remaining.splice(Math.min(remaining.length - 1, rand(slumming_factor)), 1)
      pairs.push([ c1[0], c2[0] ])
    }
    pairs
  end

  def cookie_totals(cookie)
    totals = Hash.new(0)
    cookie.keys.each do |ingredient|
      amount = cookie[ingredient]
      ingredients[ingredient].keys.each di |trait|
        totals[trait] = totals[trait] + ingredients[ingredient][trait] * amount
      end
    end
    totals
  end

end

class CalorieFreeCookieFactory < CookieFactory

  def fitness(cookie)
    totals = cookie_totals(cookie)
    delete totals[:calories]
    totals.values.map {|val| [ 0, val ].max }.reduce(:*)
  end

end

class FattyCookieFactory < CookieFactory

  def fitness(cookie)
    totals = cookie_totals(cookie)
    return 0 if totals[:calories] !== 500
    delete totals[:calories]
    totals.values.map {|val| [ 0, val ].max }.reduce(:*)
  end

end

factory = CalorieFreeCookieFactory.new
puts 'Part 1', factory.solve

factory = FattyCookieFactory.new(
  generations: 100,
  genetic_diversity: 200,
  mutation_factor: 20
)
puts 'Part 2', factory.solve
