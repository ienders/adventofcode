def distance(coords)
  delta_x = coords[0]
  delta_y = coords[1]
  delta_d = delta_y - delta_x
  [ delta_x, delta_y, delta_d ].map(&:abs).max
end

distances = []
coords = [ 0, 0 ]
File.read('input.txt').split(',').each do |instruction|
  if instruction == 'n'
    coords[1] += 1
  elsif instruction == 'ne'
    coords[0] += 1
    coords[1] += 1
  elsif instruction == 'se'
    coords[0] += 1
  elsif instruction == 's'
    coords[1] -= 1
  elsif instruction == 'sw'
    coords[0] -= 1
    coords[1] -= 1
  elsif instruction == 'nw'
    coords[0] -= 1
  end
  distances << distance(coords)
end

puts "Part 1: #{distance(coords)}"
puts "Part 2: #{distances.max}"
