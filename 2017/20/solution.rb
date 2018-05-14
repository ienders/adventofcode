def load_particles
  input = File.read('input.txt').split("\n")
  particles = []
  input.each do |line|
    parts = line.split(', ')
    matches = parts[0].match(/<(\S+),(\S+),(\S+)>/)
    pos = matches[1..3].map(&:to_i)
    matches = parts[1].match(/<(\S+),(\S+),(\S+)>/)
    vel = matches[1..3].map(&:to_i)
    matches = parts[2].match(/<(\S+),(\S+),(\S+)>/)
    acc = matches[1..3].map(&:to_i)
    particles.push(
      { pos: pos, vel: vel, acc: acc }
    )
  end
  particles
end

def tick(particle)
  particle[:vel][0] += particle[:acc][0]
  particle[:vel][1] += particle[:acc][1]
  particle[:vel][2] += particle[:acc][2]
  particle[:pos][0] += particle[:vel][0]
  particle[:pos][1] += particle[:vel][1]
  particle[:pos][2] += particle[:vel][2]
end

def closest(particles)
  min = Float::INFINITY
  pos = nil
  particles.each_with_index do |particle, i|
    distance = particle[:pos].map(&:abs).reduce(:+)
    if distance < min
      pos = i
      min = distance
    end
  end
  pos
end

def remove_collisions(particles)
  coords = {}
  particles.each_with_index do |particle, i|
    key = particle[:pos].join(',')
    coords[key] = [] unless coords[key]
    coords[key].push(i)
  end
  to_remove = []
  coords.each do |key, vals|
    to_remove += vals if vals.length > 1
  end
  to_remove.sort.reverse.each do |i|
    particles.delete_at(i)
  end
end

particles = load_particles
1000.times { |i| particles.each { |p| tick(p) } }

puts "Part 1: #{closest(particles)}"

particles = load_particles
100.times do |i|
  particles.each { |p| tick(p) }
  remove_collisions(particles)
end

puts "Part 2: #{particles.size}"
