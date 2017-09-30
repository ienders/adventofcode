const instructions = {
  hlf: r => state => ({ ...state, [r]: state[r] / 2, pos: state.pos + 1 }),
  tpl: r => state => ({ ...state, [r]: state[r] * 3, pos: state.pos + 1 }),
  inc: r => state => ({ ...state, [r]: state[r] + 1, pos: state.pos + 1 }),
  jmp: offset => state => ({ ...state, pos: state.pos + offset }),
  jie: (r, offset) => state => ({ ...state, pos: state.pos + (state[r] % 2 === 0 ? offset : 1)}),
  jio: (r, offset) => state => ({ ...state, pos: state.pos + (state[r] === 1 ? offset : 1)})
}

const computer = []

const cleanArg = (arg) => {
  if (!arg) return
  const parsed = parseInt(arg)
  if (isFinite(parsed)) return parsed
  return arg
}

const defineComputer = (line) => {
  const [ instr, arg1, arg2 ] = line.split(/,? /)
  computer.push(instructions[instr](cleanArg(arg1), cleanArg(arg2)))
}

const execute = (state) => {
  while (state.pos <= computer.length - 1) {
    state = computer[state.pos](state)
  }
  return state
}

const report = () => {
  console.log('Part 1', execute({ pos: 0, a: 0, b: 0 }).b)
  console.log('Part 2', execute({ pos: 0, a: 1, b: 0 }).b)
}

require('readline').
    createInterface({ input: require('fs').createReadStream('input.txt') }).
    on('line', defineComputer).
    on('close', report)
