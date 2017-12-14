def layer_severity(layer, delay)
  caught(layer, delay) ? layer[0] * layer[1] : 0
end

def caught(layer, delay)
  # A layer hits 0 at time % range * 2 - 2. time = delay + range.
  (delay + layer[0]) % (2 * layer[1] - 2) == 0
end

def safe_delay(input)
  delay = 0
  while true
    delay += 1
    hit = false
    input.each do |layer|
      if caught(layer, delay)
        hit = true
        break
      end
    end
    return delay unless hit
  end
end

def total_severity(input, delay = 0)
  input.map {|layer| layer_severity(layer, delay) }.reduce(:+)
end

input = File.read('input.txt').split("\n").map {|l| l.split(': ').map(&:to_i) }
puts "Part 1: #{total_severity(input)}"
puts "Part 2: #{safe_delay(input)}"
