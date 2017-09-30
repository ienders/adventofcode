const fs = require('fs')

const spells = {
  drain: {
    cost: 73,
    instant: (state) => {
      state.boss.hp = Math.max(0, state.boss.hp - 2)
      state.wizard.hp = state.wizard.hp + 2
    }
  },
  magicMissile: {
    cost: 53,
    instant: (state) => state.boss.hp = Math.max(0, state.boss.hp - 4)
  },
  poison: {
    cost: 173,
    duration: 6,
    recur: (state) => state.boss.hp = Math.max(0, state.boss.hp - 3)
  },
  recharge: {
    cost: 229,
    duration: 5,
    recur: (state) => state.wizard.mana = state.wizard.mana + 101
  },
  shield: {
    cost: 113,
    duration: 6,
    recur: (state) => state.wizard.armor = 7,
    wearoff: (state) => state.wizard.armor = 0
  }
}

const tick = (state) => {
  Object.keys(state.effects).forEach((spell) => {
    spells[spell].recur(state)
    state.effects[spell] -= 1
    if (state.effects[spell] === 0) {
      if (spells[spell].wearoff) spells[spell].wearoff(state)
      delete state.effects[spell]
    }
  })
}

const cast = (state, spell) => {
  state.wizard.mana -= spells[spell].cost
  state.wizard.manaSpent += spells[spell].cost
  if (spells[spell].instant) spells[spell].instant(state)
  if (spells[spell].duration) state.effects[spell] = spells[spell].duration
}

const availableSpells = (state) => {
  return Object.keys(spells).
      filter((spell) => spells[spell].cost <= state.wizard.mana).
      filter((spell) => !Object.keys(state.effects).includes(spell))
}

const bossAttack = (state) => {
  const dmg = Math.max(1, state.boss.dmg - state.wizard.armor)
  state.wizard.hp = Math.max(0, state.wizard.hp - dmg)
}

const clone = (state) => JSON.parse(JSON.stringify(state))

const frontier = (state, hard) => {
  if (hard) {
    state.wizard.hp -= 1
    if (state.wizard.hp === 0) return []
  }
  tick(state)
  const frontier = []
  availableSpells(state).forEach((spell) => {
    const next = clone(state)
    cast(next, spell)
    tick(next)
    if (next.boss.hp !== 0) bossAttack(next)
    if (next.wizard.hp !== 0) frontier.push(next)
  })
  return frontier
}

const minSolution = (state, hard, memo = { currentBest: Infinity }) => {
  if (state.wizard.manaSpent > memo.currentBest) return
  if (state.boss.hp === 0) {
    memo.currentBest = state.wizard.manaSpent
    return state
  }
  return frontier(state, hard).
    map((next) => minSolution(next, hard, memo)).
    filter((sol) => sol).
    sort((a, b) => a.wizard.manaSpent - b.wizard.manaSpent)[0]
}

const wizard = () => ({ hp: 50, mana: 500, manaSpent: 0, armor: 0 })

const boss = () => {
  const inputFile = require('path').join(__dirname, 'input.txt')
  const boss = {}
  fs.readFileSync(inputFile, 'utf8').split('\n').forEach((definition) => {
    const [ , fileAttr, value ] = definition.match(/^(.*): (.*)$/)
    let attr = undefined
    switch(fileAttr) {
      case 'Hit Points':
        attr = 'hp'
        break
      case 'Damage':
        attr = 'dmg'
        break
      default:
        throw new Error(`Illegal attribute name: ${fileAttr}`)
    }
    boss[attr] = parseInt(value)
  })
  return boss
}

const run = () => {
  console.log(`Part 1: ${minSolution({ wizard: wizard(), boss: boss(), effects: {} }, false).wizard.manaSpent}`)
  console.log(`Part 2: ${minSolution({ wizard: wizard(), boss: boss(), effects: {} }, true).wizard.manaSpent}`)
}

run()
