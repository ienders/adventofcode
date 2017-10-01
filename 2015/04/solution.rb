def solve(target)
  require 'digest'
  secret_key = File.read('secret_key')
  length = target.size
  i = 1
  while Digest::MD5.hexdigest("#{secret_key}#{i}")[0...length] != target
    i += 1
  end
  i
end

puts 'Part 1', solve('00000')
puts 'Part 2', solve('000000')
