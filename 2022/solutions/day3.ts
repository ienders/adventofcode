import { getInput } from "../lib/input";
import { Solution } from "../lib/solution";

type Items = string[]
type Compartments = [ Items, Items ]
type Group = [ Items, Items, Items ]

const group = (input: Items[]): Group[] => {
  const copy = [...input]
  const groups: Group[] = []
  while (copy.length > 0) {
    groups.push([
      copy.shift() as Items,
      copy.shift() as Items,
      copy.shift() as Items
    ])
  }
  return groups
}

const compartmentalize = (items: Items): Compartments =>
  [ items.slice(0, items.length / 2), items.slice(items.length / 2, items.length) ]

const intersection = (listA: Items, listB: Items): Items => {
  const set = new Set(listB)
  return listA.filter(x => set.has(x))
}

const priority = (char: string): number => {
  const asciiCode = char.charCodeAt(0)
  const lowerCasePoint = asciiCode - 96
  if (lowerCasePoint > 0) return lowerCasePoint
  return asciiCode - 38
}

export default async function (session: string): Promise<Solution> {
  const inputs: Items[] = (await getInput(session, 3)).map(input => input.split(''))
  return {
    part1: inputs
      .map(compartmentalize)
      .map(compartments => intersection(compartments[0], compartments[1])[0])
      .map(priority)
      .reduce((acc, val) => acc + val, 0),
    part2: group(inputs)
      .map(group => intersection(intersection(group[0], group[1]), group[2])[0])
      .map(priority)
      .reduce((acc, val) => acc + val, 0)
  }
}
