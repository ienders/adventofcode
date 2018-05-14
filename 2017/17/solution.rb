def spin(steps, times, target_index = nil)
  values = [ 0 ]
  current = 0
  target_val = 0
  (1..times).each do |i|
    current = (current + steps) % i + 1
    if target_index
      target_val = i if target_index == current
    else
      values.insert(current, i) unless target_index
    end
  end
  target_index ? target_val : values
end

steps = File.read('input.txt').to_i
result = spin(steps, 2017)
puts "Part 1: #{result[result.index(2017) + 1]}"
puts "Part 2: #{spin(steps, 50_000_000, 1)}"
