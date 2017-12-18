def eval(registers, x)
  return nil if x.nil?
  return x.to_i if x.to_i.to_s == x
  registers[x] ||= 0
  registers[x]
end

def execute(memo, registers, instruction, x, y)
  val_x = eval(registers, x)
  val_y = eval(registers, y)
  jmp = 1
  {
    snd: -> {
      if memo[:queues]
        memo[:queues][(memo[:curr] + 1) % 2].push(val_x)
        memo[:sent][memo[:curr]] += 1
      else
        memo[:played] = val_x
      end
    },
    set: -> {
      registers[x] = val_y
    },
    add: -> {
      registers[x] += val_y
    },
    mul: -> {
      registers[x] *= val_y
    },
    mod: -> {
      registers[x] = val_x % val_y
    },
    rcv: -> {
      if memo[:queues]
        if memo[:queues][memo[:curr]].length > 0
          registers[x] = memo[:queues][memo[:curr]].shift
        else
          jmp = 0
        end
      elsif val_x != 0
        memo[:recovered] = memo[:played]
      end
    },
    jgz: -> {
      jmp = val_y if val_x > 0
    }
  }[instruction.to_sym].call
  jmp
end

def solo(input)
  i = 0
  sound = {}
  registers = {}
  while true do
    parts = input[i].split(' ')
    i += execute(sound, registers, parts[0], parts[1], parts[2])
    return sound[:recovered] if sound[:recovered]
  end
end

def duet(input)
  i = [ 0, 0 ]
  registers = [ { 'p' => 0 }, { 'p' => 1 } ]
  memo = { curr: 0, sent: [ 0, 0 ], queues: [ [], [] ] }
  while true do
    input_index = i[memo[:curr]]
    if input[input_index]
      parts = input[input_index].split(' ')
      result = execute(memo, registers[memo[:curr]], parts[0], parts[1], parts[2])
    else
      result = 0
    end
    if result == 0
      if (memo[:queues][0].length == 0 || i[0] >= input.length) &&
         (memo[:queues][1].length == 0 || i[1] >= input.length)
        return memo[:sent][1]
      end
      memo[:curr] = (memo[:curr] + 1) % 2
    else
      i[memo[:curr]] += result
    end
  end
end

input = File.read('input.txt').split("\n")
puts "Part 1: #{solo(input)}"
puts "Part 2: #{duet(input)}"
