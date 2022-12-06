import { read, write } from './env'
import { prompt } from './prompt'

const sessionKey = 'AOC_SESSION'

const readSession = (): string | undefined =>
  read(sessionKey)

const writeSession = (session: string) =>
  write(sessionKey, session)

export const getSession = async (): Promise<string> => {
  var session: string | undefined = readSession()
  if (session) return session

  session = await prompt('Enter Advent of Code 2022 Session Token:')
  writeSession(session)
  return session
}
