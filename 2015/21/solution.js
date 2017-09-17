const fs = require('fs')

const shop = { weapons: [], armor: [], rings: [] }
const playerTemplate = { name: 'player', hp: 100, dmg: 0, armor: 0 }
const bossTemplate = { name: 'boss', hp: 0, dmg: 0, armor: 0 }

const defineBossAttribute = (definition) => {
  const [ , fileAttr, value ] = definition.match(/^(.*): (.*)$/)
  let attr = undefined
  switch(fileAttr) {
    case 'Hit Points':
      attr = 'hp'
      break
    case 'Damage':
      attr = 'dmg'
      break
    case 'Armor':
      attr = 'armor'
      break
    default:
      throw new Error(`Illegal attribute name: ${fileAttr}`)
  }
  bossTemplate[attr] = parseInt(value)
}

const defineShop = (shopLines) => {
  const sectionRegex = /(.*):\s+Cost\s+Damage\s+Armor/
  const itemRegex = /(.*[^\s+])\s+(\d+)\s+(\d+)\s+(\d+)/
  let currentSection
  shopLines.forEach((line) => {
    let match
    if (match = line.match(sectionRegex)) {
      [ , section ] = match
      switch(section) {
        case 'Weapons':
          currentSection = 'weapons'
          break
        case 'Armor':
          currentSection = 'armor'
          break
        case 'Rings':
          currentSection = 'rings'
          break
        default:
          throw new Error(`Illegal section in shop: ${section}`)
      }
    } else if (match = line.match(itemRegex)) {
      [ , itemName, cost, dmgBonus, armorBonus ] = match
      shop[currentSection].push({
        name: itemName,
        cost: parseInt(cost),
        dmgBonus: parseInt(dmgBonus),
        armorBonus: parseInt(armorBonus)
      })
    }
  })
}

const defineGame = () => {
  fs.readFileSync('input.txt', 'utf8').split('\n').forEach(defineBossAttribute)
  defineShop(fs.readFileSync('shop.txt', 'utf8').split('\n'))
}

const equip = (player, items) => {
  items.forEach((item) => {
    player.dmg += item.dmgBonus
    player.armor += item.armorBonus
  })
}

const weaponSets = () => shop.weapons.map((set) => [ set ])

const armorSets = () => [[]].concat(shop.armor.map((set) => [ set ]))

const ringSets = () => {
  const permutations = [[]].concat(shop.rings.map((set) => [ set ]))
  for (let i = 0; i < shop.rings.length - 1; i++) {
    for (let j = i + 1; j < shop.rings.length; j++) {
      permutations.push([ shop.rings[i], shop.rings[j] ])
    }
  }
  return permutations
}

const itemSets = () => {
  const weapons = weaponSets(), armor = armorSets(), rings = ringSets()
  const sets = []
  for (let i = 0; i < weapons.length; i++) {
    for (let j = 0; j < armor.length; j++) {
      for (let k = 0; k < rings.length; k++) {
        sets.push(weapons[i].concat(armor[j]).concat(rings[k]))
      }
    }
  }
  return sets
}

const itemSetCost = (itemSet) => {
  return itemSet.map((item) => item.cost).reduce((sum, value) => sum + value)
}

const damageAmount = (dmg, armor) => Math.max(1, dmg - armor)

const dealDamage = (defender, amount) => defender.hp = Math.max(0, defender.hp - amount)

const evaluateTurn = (attacker, defender) => {
  let dmg = damageAmount(attacker.dmg, defender.armor)
  dealDamage(defender, dmg)
  return defender.hp
}

const simulate = (items) => {
  const player = Object.assign({}, playerTemplate)
  equip(player, items)

  const boss = Object.assign({}, bossTemplate)
  let attacker = player, defender = boss
  while (evaluateTurn(attacker, defender) !== 0) {
    let swap = attacker
    attacker = defender
    defender = swap
  }
  return attacker.name === 'player'
}

const run = () => {
  const sets = itemSets()
  sets.sort((a, b) => itemSetCost(a) - itemSetCost(b))
  let i = 0
  while (!simulate(sets[i])) { i += 1 }
  
  console.log('Part 1', itemSetCost(sets[i]))

  i = sets.length - 1
  while (simulate(sets[i])) { i -= 1 }
  console.log('Part 2', itemSetCost(sets[i]))
}

defineGame()
run()
