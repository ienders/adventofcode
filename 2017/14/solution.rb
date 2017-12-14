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

def build_grid(input)
  grid = []
  128.times do |i|
    bytes = []
    "#{input}-#{i}".each_byte do |b|
      bytes << b
    end
    bytes += [ 17, 31, 73, 47, 23 ]

    # Too drunk to realize that for the first 30 mins of this question, that I was supposed
    # to use this old code. Maybe I would have actually placed...
    # wtf was a knot hash again?
    grid << hexify(reduce(rotate(bytes, 64))).split('').map {|d|
      d.hex.to_s(2).rjust(4, '0')
    }.join('').split('').map(&:to_i)
  end
  grid
end

def sum(grid)
  grid.map {|row| row.reduce(:+) }.reduce(:+)
end

def find_non_zero(grid)
  (0...128).to_a.each do |i|
    (0...128).to_a.each do |j|
      if grid[i][j] > 0
        return [ i, j ]
      end
    end
  end
end

def build_adjacent(x, y)
  [ [ x, y + 1 ], [ x, y - 1 ], [ x - 1, y ], [ x + 1, y ] ]
end

def count_regions(grid)
  grid = grid.dup
  regions = 0
  while (sum(grid) > 0)
    regions += 1
    x, y = find_non_zero(grid)
    grid[x][y] = 0
    adjacent = build_adjacent(x, y)
    while adjacent.length > 0
      x, y = adjacent.shift
      if x >= 0 && x <= 127 && y >= 0 && y <= 127 && grid[x][y] > 0
        grid[x][y] = 0
        adjacent += build_adjacent(x, y)
      end
    end
  end
  regions
end

input = File.read('input.txt')
grid = build_grid(input)
puts "Part 1: #{sum(grid)}"
puts "Part 2: #{count_regions(grid)}"
