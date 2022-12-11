import axios from 'axios'
import { load } from 'cheerio'
import { Product, ProductTypes } from '@app/models/product'

/** */
const baseURLs: {url: string, type: ProductTypes}[] = [
  // {
  //   url: 'https://www.masvision.com.ar/collections/lentes-de-contacto?view=view-48&grid_list=list-view',
  //   type: ProductTypes.contact
  // },
  // {
  //   url: 'https://www.masvision.com.ar/collections/lentes-de-sol-navidad?view=view-48&grid_list=list-view',
  //   type: ProductTypes.sun
  // },
  {
    url: 'https://www.masvision.com.ar/collections/lentes-de-sol-navidad?page=2view=view-48&grid_list=list-view',
    type: ProductTypes.sun
  },
  // {
  //   url: 'https://www.masvision.com.ar/collections/descuentos-navidad-armazones-de-receta?view=view-48&grid_list=list-view',
  //   type: ProductTypes.frame
  // },
  // {
  //   url: 'https://www.masvision.com.ar/collections/descuentos-navidad-armazones-de-receta?page=2&view=view-48&grid_list=list-view',
  //   type: ProductTypes.frame
  // },
]
/** */
const products: Product[] = []


/** */
async function getHtml(url: string): Promise<string> {
  return axios.get(url, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" }
  })
    .then(res => res.data)
    .catch(err => { throw new Error(err.message) })
}

/** */
function stockProbability() {
  var notRandomNumbers = [true, true, false, false, false, false, false, false, false, false]
  var idx = Math.floor(Math.random() * notRandomNumbers.length)
  return notRandomNumbers[idx]
}

/** */
;(async function() {
  let idIndex = 0

  for (const baseUrl of baseURLs) {
    console.log('========== Requesting:URL ==========\n', baseUrl.url)
    const $ = load( await getHtml(baseUrl.url) )

    const productLinks: string[] = []
    $('li.productgrid--item .productitem a.productitem--link').each((_, el) => {
      productLinks.push( new URL(baseUrl.url).origin + $(el).attr('href') )
    })

    for (const productUrl of productLinks) {
      console.log('====== Requesting:product ======\n', productUrl)
      const $ = load( await getHtml(productUrl) )
      const cod = $('.product-sku [data-product-sku]').text().trim()

      const description = $('.product-description').text()
      const images: string[] = []
      $('img.product-gallery--loaded-image').each((_, el) => {
        const [protocol, path] = $(el).attr('src').split('//')
        images.push('https://' + path)
      })

      const product: Product = {
        id: ++idIndex,

        cod: cod.length ? cod : null,
        type: baseUrl.type,
        url: productUrl,
        description: $('h1.product-title').text().trim(),
        price: parseFloat( $('.price--main .money').text().replace('$', '').replace('.', '').trim() ),
        discount: parseFloat( $('.product-pricing [data-price-percent-saved]').text().trim() ),

        images
      }

      console.log( product )
    }

  }
})()
