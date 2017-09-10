/*
  Part 1 boils down to finding highly composite numbers
  (and in fact the correct answer is pretty simple to just pull off of a number chart).
  But, we want to code this, so let's compute the lowest order highly composite number
  that exceeds the target answer.

  To do so, we generate the possible prime exponent combinations such that
  2 ^ a * 3 ^ b * 5 ^ c * 7 ^ d * ... where a >= b >= c >= d ...
  for each prime factor until we get to our solution.
*/

const primes = [ 2, 3, 5, 7, 11, 13 ] // Enough for our purposes

const decodeFactorialization = str => str.split(',').map((val) => parseInt(val))

const highlyCompositeExponents = (primeFactor) => {
  if (primeFactor <= 1) { return { '1': true } }
  let lowerOrderCombinations = highlyCompositeExponents(primeFactor - 1)
  let combinations = {}
  Object.keys(lowerOrderCombinations).forEach((exponentStr) => {
    const combo = decodeFactorialization(exponentStr)
    for (let i = 0; i < combo.length; i++) {
      if ((i == 0 && combo[i] < primes.length) || combo[i] + 1 <= combo[i - 1]) {
        const copy = combo.slice()
        copy[i] = copy[i] + 1
        combinations[copy.join(',')] = true
      }
    }
    if (combo.length < primes.length) {
      combinations[combo.slice().concat([ 1 ]).join(',')] = true
    }
  })
  return combinations
}

const highlyCompositeNumbersForPrimeFactor = (primeFactor) => {
  const exponentiation = Object.keys(highlyCompositeExponents(primeFactor))
  return exponentiation.map((exponentStr) => exponentToHCN(exponentStr))
}

const highlyCompositeNumbersUpToPrimeFactor = (primeFactor) => {
  let numbers = {}
  for (let i = 1; i <= primeFactor; i++) {
    highlyCompositeNumbersForPrimeFactor(i).forEach((number) => numbers[number] = 1)
  }
  let numberList = Object.keys(numbers).map((num) => parseInt(num))
  numberList.sort((a, b) => a - b)
  return numberList
}

const exponentToHCN = (exponentStr) => {
  const factorialization = decodeFactorialization(exponentStr)
  let total = 1
  for (let i = 0; i < factorialization.length; i++) {
    total *= Math.pow(primes[i], factorialization[i])
  }
  return total
}

const presentsForHouse = (houseNum, giftsPerVisit, maximum) => {
  const increment = (i, total) => {
    if (maximum && (houseNum / i) > maximum) {
      return total
    }
    return total + i * giftsPerVisit
  }
  let total = 0
  for (let i = 1; i <= Math.sqrt(houseNum); i++) {
    if (houseNum % i === 0) {
      total = increment(i, total)
      if ((houseNum / i) !== i) {
        total = increment(houseNum / i, total)
      }
    }
  }
  return total
}

const solve = (target, giftsPerVisit, maximum) => {
  // Good enough. This covers up to HCN Order 38.
  const hcns = highlyCompositeNumbersUpToPrimeFactor(12)
  for (let i = 0; i < hcns.length; i++) {
    if (presentsForHouse(hcns[i], giftsPerVisit, maximum) >= target) {
      return hcns[i]
    }
  }
}

const target = parseInt(require('fs').readFileSync('input.txt', 'utf8'))

console.log('Part 1', solve(target, 10))
console.log('Part 2', solve(target, 11, 50))
