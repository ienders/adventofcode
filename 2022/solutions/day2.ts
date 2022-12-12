import { Solution } from '../lib/solution'
import { getInput } from '../lib/input'

type Input = [
    'A' | 'B' | 'C',
    'X' | 'Y' | 'Z'
]

const tiesAgainst = { 'X': 'A', 'Y': 'B', 'Z': 'C' }
const winsAgainst = { 'X': 'C', 'Y': 'A', 'Z': 'B' }

const result = (input: Input): number => {
  if (winsAgainst[input[1]] === input[0]) return 6
  if (tiesAgainst[input[1]] === input[0]) return 3
  return 0
}

const score = (input: Input): number => ({ 'X': 1, 'Y': 2, 'Z': 3 }[input[1]])

export default async function (session: string): Promise<Solution> {
  const inputs: Input[] = (await getInput(session, 2)).map((row) => {
    const parts = row.split(" ").slice(0, 2)
    return [ parts[0], parts[1] ] as Input
  })
  return {
    part1: inputs.reduce((acc, input) => acc + score(input) + result(input), 0),
    part2: 'TODO'
  }
}
