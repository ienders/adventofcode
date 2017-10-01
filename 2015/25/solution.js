const next = (prev) => prev * 252533 % 33554393

const num = (row, col) => {
  let num = 1
  for (let i = 1; i < row; i++) num += i
  for (let i = 1, inc = row + 1; i < col; i++, inc++) num += inc
  return num
}

const solve = (row, col) => {
  let code = 20151125
  let codeNum = num(row, col)
  for (let i = 1; i < codeNum; i++) code = next(code)
  console.log('The Final Answer', code)
}


let input = require('fs').readFileSync('input.txt', 'utf8')
const [, row, col] = input.match(/row (\d+), column (\d+)\./)

solve(parseInt(row), parseInt(col))
