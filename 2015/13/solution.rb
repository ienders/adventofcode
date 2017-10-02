def permute_seats(people)
  return [ people ] if people.length <= 1
  result = []
  people.each do |person|
    people.delete(person)
    permute_seats(people).each do |permutation|
      result.push([ person ] + permutation)
    end
    people.unshift(person)
  end
  result
end

def solve(rules, additionalPeople = [])
  max = 0
  permute_seats(rules.keys + additionalPeople).each do |people|
    happiness = 0
    for i in 0...(people.length - 1)
      happiness += rules[people[i]][people[i + 1]] + rules[people[i + 1]][people[i]]
    end
    happiness += rules[people.last][people.first] + rules[people.first][people.last]
    max = happiness if happiness > max
  end
  max
end

rules = Hash.new do |hash, key|
  hash[key] = Hash.new(0)
end

File.open('input.txt').each_line do |line|
  matcher = /^(.*) would (lose|gain) (\d+) happiness units? by sitting next to (.*)\.$/
  person, action, happiness, neighbour = matcher.match(line)[1..4]
  rules[person][neighbour] = happiness.to_i * (action === 'lose' ? -1 : 1)
end

puts 'Part 1', solve(rules)
puts 'Part 2', solve(rules, [ 'Ian' ])
