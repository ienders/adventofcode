import { Solution } from '../lib/solution'
import { getInputAsInts } from '../lib/input'

export default async function (session: string): Promise<Solution> {
  const inputs: number[] = await getInputAsInts(session, 1)
  const elves: number[] = []
  let currentElf: number[] = []

  const saveCurrentElf = () => elves.push(currentElf.reduce((acc, curr) => acc + curr, 0))

  inputs.forEach(input => {
    if (isNaN(input)) {
      saveCurrentElf()
      currentElf = []
    } else {
      currentElf.push(input)
    }
  })
  saveCurrentElf()

  elves.sort((a, b) => b - a)

  return {
    part1: elves[0],
    part2: elves[0] + elves[1] + elves[2]
  }
}
