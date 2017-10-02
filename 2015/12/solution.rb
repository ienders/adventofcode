require 'json'

def solve(node, exclude_value = nil)
  node_value = 0
  return node if node.is_a? Numeric
  if node.is_a?(Array)
    node.each do |value|
      node_value += solve(value, exclude_value)
    end
  elsif node.respond_to? :values
    node.values.each do |value|
      return 0 if exclude_value && value == exclude_value
      node_value += solve(value, exclude_value)
    end
  end
  node_value
end

input = File.read('input.txt')
json = JSON.parse(input)

puts 'Part 1', solve(json)
puts 'Part 2', solve(json, 'red')
