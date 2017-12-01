def solution(vals, distance = 1)
  sum = 0
  vals.each_with_index do |val, i|
    nxt = vals[(i + distance) % vals.length]
    if nxt == val
      sum += val
    end
  end
  sum
end

input = File.read('input.txt').split('').map(&:to_i)

puts solution(input)
puts solution(input, input.length / 2)