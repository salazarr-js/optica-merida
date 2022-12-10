import { rest, setupWorker } from 'msw'
import { Product } from '../app/models/product'

/** */
async function getMockedProducts(): Promise<Product[]> {
  const { products } = await fetch('/assets/db.json')
    .then((response) => response.json())

  return products
}

/** */
const producHandlers = [
  /** getAll */
  rest.get('*/products', async (_, res, ctx) => res(
    ctx.delay(),
    ctx.json({ data: { products: await getMockedProducts() } })
  )),

  /** getProduct */
  rest.get('*/product/:productId', (req, res, ctx) => res(
    ctx.json({ data: [] })
  )),

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
export const worker = setupWorker(...producHandlers)
