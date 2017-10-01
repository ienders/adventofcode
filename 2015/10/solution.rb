def solve(input, times)
  saying = input
  for i in 0...times
    nxt = ''
    prev_char = saying[0]
    count = 1
    saying[1, saying.size - 1].each_char do |curr_char|
      if curr_char == prev_char
        count += 1
      else
        nxt << count.to_s + prev_char
        prev_char = curr_char
        count = 1
      end
    end
    nxt << count.to_s + prev_char
    saying = nxt
  end
  saying.size
end

input = File.read('input.txt')

puts 'Part 1', solve(input, 40)
puts 'Part 2', solve(input, 50)
