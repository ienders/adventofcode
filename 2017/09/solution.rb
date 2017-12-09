def purge_garbage(txt)
  escaped = txt.gsub(/\!./, '')
  purged = escaped.gsub(/<[^>]*>/, '<>')
  [ escaped.length - purged.length, purged ]
end

def score(txt)
  level = 0
  total = 0
  txt.gsub(/<|>|,/, '').each_char do |c|
    if c == '{'
      level += 1
    else
      total += level
      level -= 1
    end
  end
  total
end

number_purged, clean_stream = purge_garbage(File.read('input.txt'))

puts "Part 1: #{score(clean_stream)}"
puts "Part 2: #{number_purged}"
