import { writeFile } from 'fs'
import DB from './src/assets/db.json'

/** */
function randomWithProbability() {
  var notRandomNumbers = [true, true, false, false, false, false, false, false, false, false]
  var idx = Math.floor(Math.random() * notRandomNumbers.length)
  return notRandomNumbers[idx]
}

let unstocked = 0
const products = DB.products.map((product, index) => {
  const stock = randomWithProbability() ? 0 : product.stock
  if (stock == 0) unstocked++
  return { ...product, id: index + 1, stock }
})

console.log("Products count: ", DB.products.length)
console.log("Unstocked count: ", unstocked)

writeFile('db.json', JSON.stringify({ products }, null, 2), err => console.log(err))
