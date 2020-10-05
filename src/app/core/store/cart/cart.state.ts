import { Injectable } from '@angular/core';
import {
  State, Action,
  Selector, StateContext
} from '@ngxs/store';

import { tap } from 'rxjs/operators';

// MODELs
import { Product } from '@models/product';
import { CartStateModel } from './cart.model';
// SERVICES
import { ProductsApiService } from '@services/products-api/products-api.service';
// ACTIONS
import {
  GetDetailedProducts, SetDetailedProducts,
  AddProduct, RemoveProduct,
} from './cart.actions';


/** RETURN `State` DEFAULT INITIAL VALUE */
export function cartDefaultValue(): CartStateModel {
  return {
    products: [],
    detailedProducts: [],

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

  /** RETURN CART `products` */
  @Selector<number[]>()
  static products(state: CartStateModel) {
    return state.products;
  }

  /** RETURN CART `detailedPproducts` */
  @Selector<Product[]>()
  static detailedProducts(state: CartStateModel) {
    return state.detailedProducts;
  }

  // /** GET/REQUEST ALL PLANS FROM API */
  // @Action(GetAllPlans, { cancelUncompleted: true })
  // public gettAllPlans(ctx: StateContext<PlansStateModel>) {
  //   ctx.patchState({ ...ctx.getState(), load: true }); // isLoading

  //   return this.plansApi.getAll().pipe(
  //     tap( response => {
  //       ctx.patchState({ ...ctx.getState(), load: false, error: null });
  //       return ctx.dispatch( new SetPlans(response.data) );
  //     }, (error, state = ctx.getState()) => {
  //       return ctx.patchState({ ...state, fill: Array.isArray(state.plans), load: false, error });
  //     })
  //   );
  // }

  // /** GET/REQUEST USER SELECTED PLAN FROM API */
  // @Action(GetSelectedPlan, { cancelUncompleted: true })
  // public getSelectedPlan(ctx: StateContext<PlansStateModel>) {
  //   ctx.patchState({ ...ctx.getState(), load: true }); // isLoading

  //   return this.plansApi.getSelected().pipe(
  //     tap( response => {
  //       ctx.patchState({ ...ctx.getState(), load: false, error: null });
  //       return ctx.dispatch( new SetSelectedPlan(response.data) );
  //     }, (error, state: PlansStateModel = ctx.getState()) => {
  //       return ctx.patchState({ ...state, fill: Array.isArray(state.plans), load: false, error });
  //     })
  //   );
  // }

  /** ADD PRODUCT ID TO CART STATE */
  @Action(AddProduct)
  public addProduct(ctx: StateContext<CartStateModel>, { productId }: AddProduct) {
    const products = [ ...ctx.getState().products ];
    products.push( productId );

    ctx.patchState({ ...ctx.getState(), products });

    // TODO: SI EL ID YA EXISTE AUMENTAR EL `amount`
  }

  // /** SET/SAVE USER SELECTED PLAN ON API */
  // @Action(SetSelectedPlan)
  // public setSelectPlan(ctx: StateContext<PlansStateModel>, { selectedPlan, updatePlans }: SetSelectedPlan) {
  //   const state = ctx.getState();
  //   const plans = state.plans;
  //   const oldSelectedPlan = state.selectedPlan;

  //   ctx.patchState({ ...state, selectedPlan : { ...selectedPlan, isSelected: true } });

  //   // UPDATE PLANS
  //   if ( updatePlans && Array.isArray(plans) ) {
  //     const newPlans: Plan[] = plans.map(plan => {
  //       const isSelected = plan.id === selectedPlan.id;
  //       return { ...plan, isSelected };
  //     });

  //     return ctx.dispatch( new SetPlans(newPlans, false) );
  //   }
  // }

  // /** SET/SAVE REQUEST USER SELECTED PLAN ON API */
  // @Action(SaveSelectedPlan, { cancelUncompleted: true })
  // public saveSelectedPlan(ctx: StateContext<PlansStateModel>) {
  //   const state: PlansStateModel = ctx.getState();
  //   const selectedPlan: Plan = ctx.getState().selectedPlan;

  //   if ( selectedPlan ) {
  //     ctx.patchState({ ...state, load: true }); // isLoading
  //     return this.plansApi.select( selectedPlan.id ).pipe(
  //       tap(response => {
  //         ctx.patchState({ ...state, load: false, error: null }); // isLoading
  //       }, error => {
  //         ctx.patchState({ ...ctx.getState(), load: false, error });
  //       })
  //     );
  //   } else {
  //     throw new Error('no selected plan');
  //   }
  // }
}
