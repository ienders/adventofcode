import { getSession } from './lib/session'
import day1 from './solutions/day1'

getSession().then(async (session: string) => {  
  const solution = await day1(session)
  console.log(`Part 1: ${solution.part1}`)
  console.log(`Part 2: ${solution.part2}`)
})
