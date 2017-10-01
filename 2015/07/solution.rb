class Circuit

  def initialize
    @circuit = {}
    @signals = {}
  end

  def evaluate(definition)
    if result = /^(\w+)$/.match(definition)
      return gate(result[1])
    end

    if result = /^NOT (\w+)$/.match(definition)
      return ~ gate(result[1])
    end

    if result = /^(\w+) AND (\w+)$/.match(definition)
      return gate(result[1]) & gate(result[2])
    end

    if result = /^(\w+) OR (\w+)$/.match(definition)
      return gate(result[1]) | gate(result[2])
    end

    if result = /^(\w+) RSHIFT (\w+)$/.match(definition)
      return gate(result[1]) >> gate(result[2])
    end

    if result = /^(\w+) LSHIFT (\w+)$/.match(definition)
      return gate(result[1]) << gate(result[2])
    end
  end

  def define_gate(line)
    definition, out_gate = /^(.*) -> (\w+)$/.match(line)[1..2]
    @circuit[out_gate] = definition
  end

  def gate(reference)
    val = reference.to_i
    return val if val.to_s == reference
    @signals[reference] ||= evaluate(@circuit[reference])
  end

  def reset(signals)
    @signals = signals
  end

end

circuit = Circuit.new

File.open('input.txt').each_line do |line|
  circuit.define_gate line
end

puts 'Part 1', circuit.gate('a')
circuit.reset({ 'b' => circuit.gate('a') })
puts 'Part 2', circuit.gate('a')
