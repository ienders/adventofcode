let reindeer = {}
let distances = {}
let scores = {}

const maximum = (obj) => Math.max.apply(null, Object.values(obj))

const defineDeer = (line) => {
  const matcher = /^(.*) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\.$/
  const [ , deer, speed, flyTime, restTime ] = line.match(matcher)
    reindeer[deer] = {
    speed: parseInt(speed),
    flyTime: parseInt(flyTime),
    restTime: parseInt(restTime),
    flying: true,
    timeInState: 0
  }
}

const iterateDeer = (func) => Object.keys(reindeer).forEach(func)

const deerDoneCurrentState = (deer) => {
  return deer.timeInState === deer[deer.flying ? 'flyTime' : 'restTime']
}

const incrementDeerTime = (deer) => {
  deer.timeInState += 1
  if (deerDoneCurrentState(deer)) {
    deer.flying = !deer.flying
    deer.timeInState = 0
  }
}

const tick = () => {
  iterateDeer((deer) => {
    const { speed, flying } = reindeer[deer]
    if (flying) distances[deer] = (distances[deer] || 0) + speed
    incrementDeerTime(reindeer[deer])
  })
  const currentMaximum = maximum(distances)
  iterateDeer((deer) => {
    if ((distances[deer] || 0) === currentMaximum) {
      scores[deer] = (scores[deer] || 0) + 1
    }
  })
}

const report = () => {
  for (let i = 0; i < 2503; i++) tick()
  console.log('Part 1', maximum(distances))
  console.log('Part 2', maximum(scores))
}

require('readline').
    createInterface({ input: require('fs').createReadStream('input.txt') }).
    on('line', defineDeer).
    on('close', report)
