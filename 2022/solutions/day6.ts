import { getInput } from "../lib/input"
import { Solution } from "../lib/solution"

const endOfFirstMarker = (markerSize: number, input: string): number => {
  const counts: { [char: string]: number } = {}

  const incr = (char: string) => {
    if (counts[char] !== undefined) counts[char] += 1
    else counts[char] = 1
  }

  const decr = (char: string) => {
    counts[char] -= 1
    if (counts[char] === 0) delete counts[char]
  }

  for (let i = 0; i < markerSize; i++) incr(input[i])

  for (let i = markerSize; i < input.length; i++) {
    decr(input[i - markerSize])
    incr(input[i])
    if (Object.keys(counts).length === markerSize) return i + 1
  }

  return 0
}

export default async function (session: string): Promise<Solution> {
  const input = (await getInput(session, 6))[0]
  return {
    part1: endOfFirstMarker(4, input),
    part2: endOfFirstMarker(14, input)
  }
}
