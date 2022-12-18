import { getInput } from "../lib/input"
import { Solution } from "../lib/solution"

type Range = [ number, number ]
type Pair = [ Range, Range ]

const fullyContained = (pair: Pair): boolean => {
  const [ a, b ] = pair
  return (a[0] <= b[0] && a[1] >= b[1]) || (b[0] <= a[0] && b[1] >= a[1])
}

const overlap = (pair: Pair): boolean => {
  const [ a, b ] = pair
  return !(a[1] < b[0] || b[1] < a[0])
}

export default async function (session: string): Promise<Solution> {
  const pairs: Pair[] = (await getInput(session, 4))
    .map(input => input.split(","))
    .map(pair => pair.map(val =>
      val.split("-").map(val => parseInt(val)) as Range
    ) as Pair)
  
  return {
    part1: pairs.filter(fullyContained).length,
    part2: pairs.filter(overlap).length
  }
}
