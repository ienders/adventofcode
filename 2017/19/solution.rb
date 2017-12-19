def tile(grid, pos)
  (grid[pos[0]] || {})[pos[1]] || ' '
end

def find_start(grid, pos)
  while true do
    return pos if tile(grid, pos) == '|'
    pos[1] += 1
  end
end

grid = File.read('input.txt').split("\n").map {|row| row.split('') }
pos = find_start(grid, [ 0, 0 ])
dir = [ 1, 0 ]
count = 0
letter_order = []

while true do
  count += 1
  pos[0] += dir[0]
  pos[1] += dir[1]
  result = tile(grid, pos)
  if result.match(/[A-Z]/)
    letter_order << result
  elsif result == '+'
    if dir[0] == 1 || dir[0] == -1
      dir[0] = 0
      if tile(grid, [ pos[0], pos[1] - 1 ]) != ' '
        dir[1] = -1
      elsif tile(grid, [ pos[0], pos[1] + 1 ]) != ' '
        dir[1] = 1
      end
    else
      dir[1] = 0
      if tile(grid, [ pos[0] - 1, pos[1] ]) != ' '
        dir[0] = -1
      elsif tile(grid, [ pos[0] + 1, pos[1] ]) != ' '
        dir[0] = 1
      end
    end
    break if dir == [ 0, 0 ]
  elsif result == ' '
    break
  end

end

puts "Part 1: #{letter_order.join}"
puts "Part 2: #{count}"
