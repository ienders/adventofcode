def square_feet_needed(sides)
  3 * sides[0] * sides[1] + 2 * sides[1] * sides[2] + 2 * sides[2] * sides[0]
end

def ribbon_needed(sides)
  2 * sides[0] + 2 * sides[1] + sides[0] * sides[1] * sides[2]
end

total_wrapping_paper = 0
total_ribbon = 0

File.open('input.txt') do |f|
  f.each_line do |line|
    side_lengths = line.split('x').map(&:to_i).sort
    total_wrapping_paper += square_feet_needed(side_lengths)
    total_ribbon += ribbon_needed(side_lengths)
  end
end

puts 'Part 1', total_wrapping_paper
puts 'Part 2' total_ribbon
