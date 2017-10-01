class LightGrid

  INSTRUCTION_MATCHER = /^(.*) (\d+),(\d+) through (\d+),(\d+)$/

  def initialize(toggle_on_adjustment, toggle_off_adjustment, max_brightness = nil)
    @toggle_on_adjustment = toggle_on_adjustment
    @toggle_off_adjustment = toggle_off_adjustment
    @max_brightness = max_brightness
    @lights = Array.new(1000) do
      Array.new(1000, 0)
    end
  end

  def solve
    File.open('input.txt').each_line do |line|
      instr = INSTRUCTION_MATCHER.match(line)[1..5]

      fn = case instr.shift
        when 'turn on'
          :turn_on
        when 'turn off'
          :turn_off
        when 'toggle'
          :toggle
      end
      
      x1, y1, x2, y2 = instr.map(&:to_i)

      for x in x1..x2
        for y in y1..y2
          send(fn, x, y)
        end
      end
    end

    sum_brightness
  end

  protected
  def sum_brightness
    total = 0
    @lights.each do |row|
      (row || []).each do |light|
        total += light ? light : 0
      end
    end
    total
  end

  def adjust(x, y, brightness)
    value = [ 0, @lights[x][y] + brightness ].max
    value = [ value, @max_brightness ].min if @max_brightness
    @lights[x][y] = value
  end

  def turn_on(x, y)
    adjust(x, y, 1)
  end

  def turn_off(x, y)
    adjust(x, y, -1)
  end

  def toggle(x, y)
    adjust(x, y, @lights[x][y] > 0 ? @toggle_off_adjustment : @toggle_on_adjustment)
  end

end

puts 'Part 1', LightGrid.new(1, -1, 1).solve
puts 'Part 2', LightGrid.new(2, 2).solve
