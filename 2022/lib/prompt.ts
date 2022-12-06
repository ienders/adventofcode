import { createInterface } from 'readline'

export const prompt = async (display: string): Promise<string> => {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const readLineAsync = async (display: string): Promise<string> =>
    new Promise((resolve, reject) => {
      readline.question(display, (answer) => {
        resolve(answer)
      })
    })

  var value = undefined
  while (value === undefined) {
    value = await readLineAsync(display)
  }
  readline.close()
  return value 
}
