import { exit } from 'process'
import { getDay } from './lib/args'
import { getSession } from './lib/session'
import solutions from './solutions'

const day = getDay()

getSession().then(async (session: string) => {
  const solution = solutions[day - 1]
  if (solution === undefined) {
    console.log(`Solution is not yet defined for day ${day}. Maybe come back later, or get Ian off his ass?`)
    exit(1)
  }
  const result = await solution(session)
  console.log(`Part 1: ${result.part1}`)
  console.log(`Part 2: ${result.part2}`)
})
