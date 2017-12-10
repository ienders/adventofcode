def rotate(lengths, times = 1)
  list = (0..255).to_a
  current_pos = 0
  skip_size = 0
  times.times do
    lengths.each do |length|
      swap = list.dup
      (0...length).each do |i|
        swap[(current_pos + i) % list.length] = list[(current_pos + length - 1 - i) % list.length]
      end
      list = swap
      current_pos = (current_pos + skip_size + length) % list.length
      skip_size += 1
    end
  end
  list
end

def reduce(list, size = 16)
  reduced = []
  offset = 0
  size.times do |i|
    reduced[i] = list[offset...offset + size].reduce(:^)
    offset += size
  end
  reduced
end

def hexify(list)
  str = ''
  list.each do |element|
    str += element.to_s(16).rjust(2, '0')
  end
  str
end

input = File.read('input.txt')

rotated_list = rotate(input.split(',').map(&:to_i))
puts "Part 1: #{rotated_list[0] * rotated_list[1]}"

lengths = []
input.each_byte do |c|
  lengths << c
end

lengths += [ 17, 31, 73, 47, 23 ]

puts "Part 2: #{hexify(reduce(rotate(lengths, 64)))}"
