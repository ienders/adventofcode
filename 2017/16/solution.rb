def spin(programs, x)
  programs[-x, x] + programs[0..programs.length - x - 1]
end

def exchange(programs, a, b)
  programs = programs.dup
  swp = programs[a]
  programs[a] = programs[b]
  programs[b] = swp
  programs
end

def partner(programs, a, b)
  exchange(programs, programs.index(a), programs.index(b))
end

def dance(programs, instructions, times = 1)
  i = 0
  seen = {}
  while i < times do
    instructions.each do |input|
      if matches = input.match(/^s(\d+)$/)
        programs = spin(programs, matches[1].to_i)
      elsif matches = input.match(/^x(\d+)\/(\d+)$/)
        programs = exchange(programs, matches[1].to_i, matches[2].to_i)
      elsif matches = input.match(/^p(\w+)\/(\w+)$/)
        programs = partner(programs, matches[1], matches[2])
      end
    end
    if seen[programs.join]
      i = times - (times % i)
    else
      seen[programs.join] = i
    end
    i += 1
  end
  programs
end

instructions = File.read('input.txt').split(',')
programs = 'a'.upto('p').to_a

puts "Part 1: #{dance(programs, instructions).join}"
puts "Part 2: #{dance(programs, instructions, 1_000_000_000).join}"
