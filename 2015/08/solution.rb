string_chars = 0
code_chars = 0
encoded_chars = 0

File.open('input.txt').each_line do |line|
  line = line.chomp
  code_chars += line.size
  string_chars += eval(line).size
  encoded_chars += line.dump.size
end

puts 'Part 1', code_chars - string_chars
puts 'Part 2', encoded_chars - code_chars