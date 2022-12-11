import { rest } from 'msw'
import { Product } from '../app/models/product'

/** */
let _mockProducts: Product[] = undefined
async function useMockProducts(): Promise<Product[]> {
  if (!_mockProducts)
    await fetch('/assets/db.json')
      .then((response) => response.json())
      .then(data => _mockProducts = data.products)

  return _mockProducts
}

/** */
const producHandlers = [
  /** getAll */
  rest.get('*/products', async (_, res, ctx) => res(
    ctx.delay(),
    ctx.json({ data: { products: await useMockProducts() } })
  )),

  /** getProduct */
  rest.get('*/product/:productId', async (req, res, ctx) => {
    const { productId } = req.params
    const products = await useMockProducts()
    const product = products.find(product => product.id === parseInt(productId as any))

    if ( !product )
      return res(
        ctx.delay(),
        ctx.status(404)
      )

    return res(
      ctx.delay(),
      ctx.json({ data: { product } })
    )
}),

  /** getProducts */
  rest.post('*/products/detail', async (req, res, ctx) => {
    try {
      const productIds = (await req.json()).products as number[]
      const products = (await useMockProducts()).filter(p => productIds.includes(p.id))

      return res(
        ctx.delay(),
        ctx.json({ data: { products } })
      )
    } catch (_) {
      return res(ctx.delay(), ctx.status(404))
    }
  }),

  /** buyProducts */
  rest.post('*/products/buy', async (req, res, ctx) => {
    try {
      const cartProducts = (await req.json()).products as Product[]
      const products = await useMockProducts()

      cartProducts.forEach(cartProduct => {
        const index = products.findIndex(p => p.id === cartProduct.id)

        if (index >= 0)
          products[index].stock -= cartProduct.amount
      })

      return res(
        ctx.delay(),
        ctx.json({ data: null })
      )
    } catch (_) {
      return res(ctx.delay(), ctx.status(404))
    }
  }),
]


/** */
export default  [
  ...producHandlers
]
