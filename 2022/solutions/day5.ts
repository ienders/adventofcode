import internal from "stream"
import { getInput } from "../lib/input"
import { Solution } from "../lib/solution"

type Stack = string[]
type Move = {
  quantity: number,
  from: number,
  to: number
}

type Input = {
  stacks: Stack[],
  moves: Move[]
}

const processInput = (input: string[]): Input => {
  const conf: Input = { stacks: [], moves: [] }
  const stackBuffer: string[][] = []
  let instructionIndex = 0
  
  input.some((row, index) => {
    if (row.match(/^(\s+\d+)+\s*$/)) {
      row.split("").forEach((char, index) => {
        if (char.match(/\d/)) {
          const stack: Stack = []
          for (let stackRow = stackBuffer.length - 1; stackRow >= 0; stackRow--) {
            const cell = stackBuffer[stackRow][index]
            if (cell !== " ") {
              stack.push(cell)
            } else {
              break;
            }
          }
          conf.stacks.push(stack)
        }
      })
      instructionIndex = index + 2
      return true
    } else {
      stackBuffer.push(row.split(""))
    }
    return false
  })

  conf.moves = input.slice(instructionIndex).map(row => {
    const [, qty, from, to ] = row.match(/move (\d+) from (\d+) to (\d+)/) as string[]
    return {
      quantity: parseInt(qty),
      from: parseInt(from) - 1,
      to: parseInt(to) - 1
    }
  })

  return conf
}

const operateCrateMover9000 = (input: Input): Stack[] => {
  const { stacks, moves } = input
  const result = stacks.map(stack => [...stack])

  moves.forEach(move => {
    for (let i = 0; i < move.quantity; i++) {
      const crate = result[move.from].pop() as string
      result[move.to].push(crate)
    }
  })

  return result
}

const operateCrateMover9001 = (input: Input): Stack[] => {
  const { stacks, moves } = input
  const result = stacks.map(stack => [...stack])

  moves.forEach(move => {
    const crates = result[move.from].splice(-move.quantity)
    result[move.to].push(...crates)
  })

  return result
}

const printStackTops = (stacks: Stack[]): string =>
  stacks.map(stack => stack[stack.length - 1]).join("")

export default async function (session: string): Promise<Solution> {
  const input = processInput((await getInput(session, 5)))
  return {
    part1: printStackTops(operateCrateMover9000(input)),
    part2: printStackTops(operateCrateMover9001(input))
  }
}
