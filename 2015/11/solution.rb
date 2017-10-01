def valid_pass(password)
  !!password.match(/(abc)|(bcd)|(cde)|(def)|(efg)|(fgh)|(pqr)|(qrs)|(rst)|(stu)|(tuv)|(uvw)|(vwx)|(wxy)|(xyz)/) &&
      !password.match(/[iol]/) &&
      !!password.match(/(.)\1.*(.)\2/)
end

def increment_pass(password)
  pos = password.size - 1
  while true do
    if password[pos] == 'z'
      password[pos] = 'a'
      pos -= 1
    else
      password[pos] = (password[pos].ord + 1).chr
      return
    end
  end
end

def solve(input)
  password = input
  while true do
    increment_pass(password)
    return password if valid_pass(password)
  end
end

puts 'Part 1', pass = solve(File.read('input.txt'))
puts 'Part 2', solve(pass)
