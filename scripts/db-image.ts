import { writeFile } from 'fs'
import axios from 'axios'
import { Product } from '@app/models/product'
import DB from '@assets/db.json'

(async function() {
  const products = [...DB.products] as Product[]

  let index = 0
  let removedProducts = 0
  for (const product of products ) {
    console.log("========== checking:product ==========", product.id)

    await Promise.all(
      product.images.map(img => axios.get(img, {
        headers: { 'accept-encoding': 'gzip, deflate' }
      }))
    ).then(_ => console.log("✅ all images loaded succesfull"))
    .catch(_ => {
      console.log('🚨 one of the', product.images?.length , 'loaded images failed')
      products.splice(index, 1)
      removedProducts++
    })

    index++
  }

  console.log('==========  ========== ')
  console.log(removedProducts, 'de ', DB.products.length, 'Productos removidos')

  writeFile('db.json', JSON.stringify({ products }, null, 2), (err) => console.log(err))
})()
