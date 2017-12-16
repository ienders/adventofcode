def build_generators
  generators = {
    A: { factor: 16807, multiple_check: 1 },
    B: { factor: 48271, multiple_check: 1 }
  }
  File.read('input.txt').split("\n").each do |line|
    if matches = line.match(/Generator (\w) starts with (\d+)$/)
      generators[matches[1].to_sym][:value] = matches[2].to_i
    end
  end
  generators
end

def next_pair(generators)
  pairs = []
  generators.each do |key, generator|
    while true do
      generator[:value] = generator[:value] * generator[:factor] % 2147483647
      if generator[:value] % generator[:multiple_check] == 0
        pairs << generator[:value]
        break
      end
    end
  end
  pairs
end

def battle_pairs(pairs)
  bin = pairs.map {|pair| pair.to_s(2)[-16,16] }
  bin[0] == bin[1]
end

def count_matches(generators, iterations)
  matches = 0
  iterations.times do
    matches += 1 if battle_pairs(next_pair(generators))
  end
  matches
end

generators = build_generators
puts "Part 1: #{count_matches(generators, 40_000_000)}"

generators = build_generators
generators[:A][:multiple_check] = 4
generators[:B][:multiple_check] = 8
puts "Part 2: #{count_matches(generators, 5_000_000)}"
