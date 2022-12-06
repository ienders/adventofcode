import { getInput } from './lib/input'
import { getSession } from './lib/session'

getSession().then((session: string) => {  
  getInput(session, 1).then((input: string[]) => {
    console.log(input)
  })
})
