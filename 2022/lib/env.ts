import * as dotenv from 'dotenv'

import fs from 'fs'
import os from 'os'
import path from 'path'

dotenv.config()

const envFilePath = path.resolve(path.join(__dirname, '../../'), ".env")
const readEnvVars = (): string[] => {
  if (!fs.existsSync(envFilePath)) return []
  return fs.readFileSync(envFilePath, "utf-8").split(os.EOL)
}

export const read = (key: string): string | undefined =>
  process.env[key]

export const write = (key: string, value: string): void => {
  const envVars = readEnvVars()
  const targetLine = envVars.find((line) => line.split("=")[0] === key)
  if (targetLine !== undefined) {
    const targetLineIndex = envVars.indexOf(targetLine)
    envVars.splice(targetLineIndex, 1, `${key}=${value}`)
  } else {
    envVars.push(`${key}=${value}`)
  }
  fs.writeFileSync(envFilePath, envVars.join(os.EOL))
}
