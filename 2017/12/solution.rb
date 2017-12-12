def group(programs, target)
  in_target = {}
  in_target[target] = true
  to_expand = programs[target]
  while to_expand.size > 0 do
    target = to_expand.shift
    in_target[target] = true
    # TODO: Fix this. My input had a bug (I believe).
    # If I strip all keys from a program out after constructing a group
    # I get a nil pointer when trying to construct the group for 889.
    # 889 <-> 0, 1494, since I was not able to reach it from 0 in first pass.
    # This solution gives the incorrect answer (which is off by 1).
    to_expand += programs[target].reject {|i| in_target[i] }
  end
  in_target.keys.sort
end

def groups(programs)
  groups = []
  keys = programs.keys.sort
  while keys.size > 0 do
    set = group(programs, keys.first)
    keys -= set
    groups.push(set)
  end
  groups
end

programs = {}
File.read('input.txt').each_line do |line|
  program, nodes = line.chomp.split(' <-> ')
  programs[program.to_i] = nodes.split(', ').map(&:to_i)
end

puts "Part 1: #{group(programs, 0).size}"
puts "Part 2: #{groups(programs).size}"
