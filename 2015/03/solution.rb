class Grid

  def initialize(visitors)
    @visitors = visitors
    @visited = {}
    @gifted = 0
    @positions = {}
  end

  def solve
    @visitors.each do |visitor|
      @positions[visitor] = [ 0, 0 ]
      visit @positions[visitor]
    end
    i = 0
    File.read('input.txt').each_char do |char|
      visitor = @visitors[i % @visitors.size]
      case char
        when '^'
          @positions[visitor][0] += 1
        when '<'
          @positions[visitor][1] -= 1
        when '>'
          @positions[visitor][1] += 1
        when 'v'
          @positions[visitor][0] -= 1
      end
      visit @positions[visitor]
      i += 1
    end
    @gifted
  end

  protected
  def visit(position)
    key = position.join(',')
    if !@visited[key]
      @gifted += 1
      @visited[key] = true
    end
  end

end

puts 'Part 1', Grid.new([ 'Santa' ]).solve
puts 'Part 2', Grid.new([ 'Santa', 'Robo-Santa' ]).solve
