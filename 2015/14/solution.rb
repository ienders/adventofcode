class ReindeerRace

  attr_accessor :reindeer, :distances, :scores

  def initialize(file)
    @reindeer = {}
    @distances = Hash.new(0)
    @scores = Hash.new(0)

    file.each_line do |line|
      matcher = /^(.*) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\.$/
      deer, speed, fly_time, rest_time = matcher.match(line)[1..4]
      @reindeer[deer] = {
        speed: speed.to_i,
        fly_time: fly_time.to_i,
        rest_time: rest_time.to_i,
        flying: true,
        time_in_state: 0
      }
    end
  end

  def tick
    reindeer.keys.each do |deer|
      if reindeer[deer][:flying]
        distances[deer] += reindeer[deer][:speed]
      end
      increment_deer_time(reindeer[deer])
    end
    current_max = distances.values.max
    reindeer.keys.each do |deer|
      if distances[deer] == current_max
        scores[deer] += 1
      end
    end
  end

  def max_distance
    distances.values.max
  end

  def max_score
    scores.values.max
  end

  protected
  def deer_done_current_state(deer)
    deer[:time_in_state] == deer[deer[:flying] ? :fly_time : :rest_time]
  end

  def increment_deer_time(deer)
    deer[:time_in_state] += 1
    if deer_done_current_state(deer)
      deer[:flying] = !deer[:flying]
      deer[:time_in_state] = 0
    end
  end

end

race = ReindeerRace.new(File.open('input.txt'))

2503.times { race.tick }

puts 'Part 1', race.max_distance
puts 'Part 2', race.max_score
