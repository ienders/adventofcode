const validPass = (password) => {
  return !!password.match(/(abc)|(bcd)|(cde)|(def)|(efg)|(fgh)|(pqr)|(qrs)|(rst)|(stu)|(tuv)|(uvw)|(vwx)|(wxy)|(xyz)/)
      && !password.match(/[iol]/)
      && !!password.match(/(.)\1.*(.)\2/)
}

const nextChar = (str, pos) => String.fromCharCode(str.charCodeAt(pos) + 1)

const replaceChar = (str, pos, char) => str.substr(0, pos) + char + str.substr(pos + 1)

const incrementPass = (password) => {
  let next = password
  let pos = password.length - 1
  while (true) {
    if (next.charAt(pos) === 'z') {
      next = replaceChar(next, pos, 'a')
      pos -= 1
    } else {
      return replaceChar(next, pos, nextChar(next, pos))
    }
  }
}

const solve = (input) => {
  let password = input
  while (true) {
    password = incrementPass(password)
    if (validPass(password)) {
      return password
    }
  }
}

const pass1 = solve(require('fs').readFileSync('input.txt', 'utf8'))
const pass2 = solve(pass1)

console.log('Part 1', pass1)
console.log('Part 2', pass2)
