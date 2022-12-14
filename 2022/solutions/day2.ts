import { Solution } from '../lib/solution'
import { getInput } from '../lib/input'

enum Move {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C'
}

enum Result {
  Win = 'X',
  Draw = 'Y',
  Loss = 'Z'
}

type Input = [ Move, Result ]
type Match = [ Move, Move ]

const beats = (move: Move): Move => {
  switch (move) {
    case Move.Rock: return Move.Paper
    case Move.Paper: return Move.Scissors
    case Move.Scissors: return Move.Rock
  }
}

const losesTo = (move: Move): Move => {
  switch (move) {
    case Move.Rock: return Move.Scissors
    case Move.Paper: return Move.Rock
    case Move.Scissors: return Move.Paper
  }
}

const score = (move: Move): number => {
  switch (move) {
    case Move.Rock: return 1
    case Move.Paper: return 2
    case Move.Scissors: return 3
  }
}

const inputToMatch = (input: Input, computeMove: (input: Input) => Move): Match =>
  [ input[0], computeMove(input) ]

const part1ComputeMove = (input: Input): Move => {
  const [ , result ] = input
  switch (result) {
    case Result.Win: return Move.Rock
    case Result.Draw: return Move.Paper
    case Result.Loss: return Move.Scissors
  }
}

const part2ComputeMove = (input: Input): Move => {
  const [ move, result ] = input
  switch (result) {
    case Result.Win: return losesTo(move)
    case Result.Draw: return move
    case Result.Loss: return beats(move)
  }
}
  
const matchScore = (match: Match): number => {
  const [ move, playerMove ] = match
  if (playerMove === move) return 3
  if (playerMove === beats(move)) return 6
  return 0
}

const totalScore = (matches: Match[]): number =>
  matches.reduce((acc, match) =>
    acc + score(match[1]) + matchScore(match),
    0
  )

export default async function (session: string): Promise<Solution> {
  const inputs: Input[] = (await getInput(session, 2)).map((row) => {
    const parts = row.split(" ").slice(0, 2)
    return [ parts[0], parts[1] ] as Input
  })
  return {
    part1: totalScore(inputs.map((input) => inputToMatch(input, part1ComputeMove))),
    part2: totalScore(inputs.map((input) => inputToMatch(input, part2ComputeMove)))
  }
}
