def load_programs
  programs = {}
  File.read('input.txt').each_line do |line|
    program, nodes = line.chomp.split(' <-> ')
    programs[program.to_i] = nodes.split(', ').map(&:to_i)
  end
  programs
end

def group(programs, target)
  in_target = {}
  to_expand = [ target ]
  while to_expand.size > 0 do
    target = to_expand.shift
    in_target[target] = true
    to_expand += programs[target].reject {|i| in_target[i] }
  end
  in_target.keys
end

def groups(programs)
  groups = []
  while programs.size > 0 do
    set = group(programs, programs.keys.first)
    set.each do |key|
      programs.delete(key)
    end
    groups.push(set)
  end
  groups
end

programs = load_programs

puts "Part 1: #{group(programs, 0).size}"
puts "Part 2: #{groups(programs).size}"
