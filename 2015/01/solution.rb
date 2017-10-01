floor = 0
i = 0
basement_hit = nil
File.read('input.txt').each_char do |char|
  if char == '('
    floor += 1
  elsif char == ')'
    floor -= 1
  end
  i += 1
  if floor < 0 && !basement_hit
    basement_hit = i
  end  
end

puts 'Part 1', floor
puts 'Part 2', basement_hit
