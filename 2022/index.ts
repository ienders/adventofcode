import { getInputAsInts } from './lib/input'
import { getSession } from './lib/session'

getSession().then((session: string) => {  
  getInputAsInts(session, 1).then((inputs: number[]) => {
    const elves = []
    let currentElf: number[] = []
    inputs.forEach(input => {
      if (isNaN(input)) {
        elves.push(currentElf.reduce((acc, curr) => acc + curr, 0))
        currentElf = []
      } else {
        currentElf.push(input)
      }
    })
    elves.push(currentElf.reduce((acc, curr) => acc + curr, 0))

    console.log(Math.max(...elves))

    elves.sort((a, b) => b - a)
    console.log(elves[0] + elves[1] + elves[2])
  })
})
