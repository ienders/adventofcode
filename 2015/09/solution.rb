def permute_destinations(destinations)
  return [ destinations ] if destinations.size <= 1
  result = []
  destinations.each do |destination|
    destinations.delete(destination)
    permute_destinations(destinations).each do |permutation|
      result.push([ destination ] + permutation)
    end
    destinations.unshift destination
  end
  result
end

def path_length(distances, path)
  length = 0
  for i in 1...path.size
    length += distances[path[i - 1]][path[i]]
  end
  length
end

distances = {}

File.open('input.txt').each_line do |line|
  src, dest, dist = /^(.*) to (.*) = (\d+)$/.match(line)[1..3]
  dist = dist.to_i
  distances[src] = {} unless distances[src]
  distances[dest] = {} unless distances[dest]
  distances[src][dest] = dist
  distances[dest][src] = dist
end

max_path_length = 0
min_path_length = Float::INFINITY

permute_destinations(distances.keys).each do |path|
  length = path_length(distances, path)
  min_path_length = length if min_path_length > length
  max_path_length = length if max_path_length < length
end

puts 'Part 1', min_path_length
puts 'Part 2', max_path_length