def diff(table)
  total = 0
  table.each do |row|
    total += row.max - row.min
  end
  total
end

def divisors(row)
  vals = row.sort
  while true
    val = vals.shift
    vals.each do |num|
      return [ num, val ] if num % val == 0
    end
  end
end

def divide(table)
  total = 0
  table.each do |row|
    vals = divisors(row)
    total += vals[0] / vals[1]
  end
  total
end

table = []
File.read('input.txt').each_line do |line|
  table << line.split(/\s+/).map(&:to_i)  
end

puts 'Part 1', diff(table)
puts 'Part 2', divide(table)
