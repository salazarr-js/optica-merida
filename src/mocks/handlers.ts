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
  rest.post('*/products/detail', (req, res, ctx) => res(
    ctx.json({ data: [] })
  )),

  /** buyProducts */
  rest.post('products/buy', (req, res, ctx) => res(
    ctx.json({ data: [] })
  )),
]


/** */
export default  [
  ...producHandlers
]
