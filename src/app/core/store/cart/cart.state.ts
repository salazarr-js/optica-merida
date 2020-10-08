import { Injectable } from '@angular/core';

import produce from "immer"
import { tap } from 'rxjs/operators';
// STORE
import {
  State, Action,
  Selector, StateContext
} from '@ngxs/store';
import { SetLoading } from '@store/loading';
// MODELs
import { Product } from '@models/product';
import { CartStateModel } from './cart.model';
// SERVICES
import { ProductsApiService } from '@services/products-api/products-api.service';
// ACTIONS
import {
  GetDetailedProducts, SetDetailedProducts, BuyProducts,
  AddProduct, SubstractProduct, RemoveProduct,
} from './cart.actions';
//
import { applyDiscount } from '@helpers/index';


/** RETURN `State` DEFAULT INITIAL VALUE */
export function cartDefaultValue(): CartStateModel {
  return {
    products: [],

    loading: null,
    filled: null,
    error: null
  } as CartStateModel;
}


/** SITES STORE */
@State<CartStateModel>({
  name: 'cart',
  defaults: cartDefaultValue()
})
@Injectable()
export class CartState {
  /** CONSTRUCTOR */
  constructor(private productsApi: ProductsApiService) {}

  /** RETURN TOTAL PRODUCTS IN CART */
  @Selector<number>()
  static totalProducts(state: CartStateModel) {
    return state.products
      .reduce((total, product) => total + product.amount, 0);
  }

  /** RETURN IN CART `products` WITH AMOUNT */
  @Selector<Product[]>()
  static products(state: CartStateModel) {
    return state.products;
  }
 
  /** RETURN TOTAL PRICE */
  @Selector<number>()
  static totalPrice(state: CartStateModel) {
    return state.products.reduce((total, p) => {
      return total + ( applyDiscount(p.price, p.discount) * p.amount );
    }, 0);
  }

  /** GET/REQUEST ALL PLANS FROM API */
  @Action(GetDetailedProducts, { cancelUncompleted: true })
  public getDetailedProducts(ctx: StateContext<CartStateModel>) {
    const state = ctx.getState();
    ctx.patchState({ ...state, loading: true });
    ctx.dispatch( new SetLoading(true) );

    const ids = state.products.map(p => p.id);
    if ( ids.length ) {
      return this.productsApi.getProducts(ids).pipe( 
        tap(response => {
          ctx.patchState({ ...ctx.getState(), loading: false, error: null });
          return ctx.dispatch( new SetDetailedProducts(response.data.products) );
        },error => {
          return ctx.patchState({ ...ctx.getState(), loading: false, error });
        }, () => ctx.dispatch( new SetLoading(false) ))
      );
    } else {
      ctx.dispatch( new SetLoading(false) );
      return ctx.patchState({ ...ctx.getState(), loading: false });
    }
  }

  /** SET/SAVE PRODUCTS WITH DETAILS TO CART STATE */
  @Action(SetDetailedProducts)
  public setDetailedProducts(ctx: StateContext<CartStateModel>, { detailedProducts }: SetDetailedProducts) {
    const state = ctx.getState();

    const products = produce(state.products, products => {
      return products.map(product => {
        const index = detailedProducts.findIndex(p => p.id === product.id);

        return { ...detailedProducts[index], ...product };
      });
    });

    ctx.setState({ ...state, products });
  }

  /** ADD PRODUCT ID TO CART STATE */
  @Action(AddProduct)
  public addProduct(ctx: StateContext<CartStateModel>, { id }: AddProduct) {
    const state = ctx.getState().products;

    const products = produce(state, products => {
      let index = products.findIndex(p => p.id == id);

      if ( index >= 0 ) {
        products[index].amount++;
      } else {
        products.push({ id, amount: 1 });
      }
      return products;
    });

    ctx.patchState({ ...state, products });
  }

  /** DECREASE PRODUCT AMOUNT BY ID TO CART STATE */
  @Action(SubstractProduct)
  public substractProduct(ctx: StateContext<CartStateModel>, { id }: SubstractProduct) {
    const state = ctx.getState().products;

    const products = produce(state, products => {
      let index = products.findIndex(p => p.id == id);

      if ( index >= 0 ) {
        const amount = products[index].amount;

        products[index].amount = amount > 1 ? amount - 1: amount;
      }
      return products;
    });

    ctx.patchState({ ...state, products });
  }

  /** REMOVE PRODUCT ID FROM CART STATE */
  @Action(RemoveProduct)
  public removeProduct(ctx: StateContext<CartStateModel>, { id }: RemoveProduct)  {
    const state = ctx.getState().products;

    const products = produce(state, products => {
      let index = products.findIndex(p => p.id == id);

      if ( index > -1 ) {
        products.splice(index, 1);
      }
      return products;
    });

    ctx.patchState({ ...state, products });
  }


  /** BUY ALL PRODUCTS IN CART STATE */
  @Action(BuyProducts, { cancelUncompleted: true })
  public buyProducts(ctx: StateContext<CartStateModel>) {
    const state = ctx.getState();
    ctx.dispatch( new SetLoading(true) );
    
    return this.productsApi.buyProducts(state.products).pipe(
      tap(
        response => null, 
        error=> null,
        () => {
          ctx.dispatch( new SetLoading(false) );
      })
    );
  }
}
