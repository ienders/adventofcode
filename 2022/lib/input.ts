import https from 'https'

export const getInput = async (session: string, day: number): Promise<string[]> => {
  const options = {
    hostname: 'adventofcode.com',
    port: 443,
    path: `/2022/day/${day}/input`,
    method: 'GET',
    headers: {
      'Cookie': `session=${session}`,
    }
  }

  return new Promise<string[]>((resolve, reject) =>
    https.get(options, resp => {
      let data = ''
      resp.on('data', chunk => data += chunk)
      resp.on('end', () => resolve(data.split("\n")))
    }).on("error", err => reject("Error: " + err.message))
  )
}

export const getInputAsInts = async (session: string, day: number): Promise<number[]> =>
  (await getInput(session, day)).map(val => parseInt(val))
