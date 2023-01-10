import { Injectable } from '@angular/core';
import produce from 'immer';
import { tap } from 'rxjs/operators';
// STORE
import {
  State, Action,
  Selector, StateContext
} from '@ngxs/store';
import { SetLoading } from '@store/loading';
// MODELs
import { Product, ProductTypes } from '@models/product';
import { ProductsStateModel } from './products.model';
// SERVICES
import { ProductsApiService } from '@services/products-api/products-api.service';
// ACTIONS
import {
  GetAllProducts, SetProducts,
  SetTypeFilter, RemoveTypeFilter,
  SetSearchText, RemoveSearchText, SetSearchable,
  LoadMoreProducts
} from './products.actions';

/** */
const PRODUCTS_AMOUNT = 24


/** RETURN `State` DEFAULT INITIAL VALUE */
export function ProductsDefaultValue(): ProductsStateModel {
  return {
    loadedProducts: PRODUCTS_AMOUNT,
    allProducts: [],
    typeFilter: null,
    searchText: null,
    searchable: false,

    loading: null,
    filled: null,
    error: null
  } as ProductsStateModel;
}


/** SITES STORE */
@State<ProductsStateModel>({
  name: 'products',
  defaults: ProductsDefaultValue()
})
@Injectable()
export class ProductsState {
  /** CONSTRUCTOR */
  constructor(private productsApi: ProductsApiService) {}

  /** RETURN FILTERED PRODUCTS */
  @Selector<Product[]>()
  static filteredProducts(state: ProductsStateModel) {
    const anyFilter = state.typeFilter !== null || state.searchText !== null

    if (anyFilter)
      return state.allProducts
        .filter(p => {
          const byTypeFilter = p.type === (state.typeFilter ?? '')
          const bySearchText = p.description.toLowerCase().includes(state.searchText)

          return (
            (state.typeFilter ? byTypeFilter : true)
            && (state.searchText ? bySearchText : true)
          )
        })

    return state.allProducts.slice(0, state.loadedProducts)
  }

  /** RETURN SELECTED TYPE FILTER */
  @Selector<ProductTypes>()
  static typeFilter(state: ProductsStateModel) {
    return state.typeFilter;
  }


  /** RETURN SEARCHABLE */
  @Selector<ProductTypes>()
  static isSearchable(state: ProductsStateModel) {
    return state.searchable;
  }

  /** GET/REQUEST ALL PLANS FROM API */
  @Action(GetAllProducts, { cancelUncompleted: true })
  public getAllProducts(ctx: StateContext<ProductsStateModel>) {
    const state = ctx.getState();
    ctx.patchState({ ...state, loading: true });
    ctx.dispatch( new SetLoading(true) );

    return this.productsApi.getAll().pipe(
      tap(response => {
        ctx.patchState({ ...ctx.getState(), loading: false, error: null });
        return ctx.dispatch( new SetProducts(response.data.products) );
      },error => {
        return ctx.patchState({ ...ctx.getState(), loading: false, error });
      }, () => ctx.dispatch( new SetLoading(false) ))
    );
  }

  /** SET/SAVE PRODUCTS WITH DETAILS TO STATE */
  @Action(SetProducts,)
  public setProducts(ctx: StateContext<ProductsStateModel>, { allProducts }: SetProducts) {
    ctx.patchState({
      ...ctx.getState(),
      allProducts,
      loadedProducts: PRODUCTS_AMOUNT
    });
  }

  /** SET/SAVE TYPE FILTER TO STATE */
  @Action(SetTypeFilter,)
  public setTypeFilter(ctx: StateContext<ProductsStateModel>, { typeFilter }: SetTypeFilter) {
    ctx.patchState({ ...ctx.getState(), typeFilter });
  }

  /** SET/SAVE TYPE FILTER TO STATE */
  @Action(RemoveTypeFilter)
  public removeTypeFilter(ctx: StateContext<ProductsStateModel>) {
    ctx.patchState({ ...ctx.getState(), typeFilter: null });
  }

  /** SET/SAVE SEARCH TEXT TO STATE */
  @Action(SetSearchText,)
  public setSearchText(ctx: StateContext<ProductsStateModel>, { searchText }: SetSearchText) {
    ctx.patchState({ ...ctx.getState(), searchText });
  }

  /** SET/SAVE TYPE FILTER TO STATE */
  @Action(RemoveSearchText)
  public removeSearchText(ctx: StateContext<ProductsStateModel>) {
  const state = ctx.getState()
  if ( state.searchText )
    ctx.patchState({ ...state, searchText: null });
  }


  /** SET/SAVE SEARCHABLE TO STATE */
  @Action(SetSearchable)
  public setSearchable(ctx: StateContext<ProductsStateModel>, { searchable }: SetSearchable) {
    ctx.patchState({ ...ctx.getState(), searchable });
  }

  /** */
  @Action(LoadMoreProducts)
  public loadMoreProducts(ctx: StateContext<ProductsStateModel>) {
    ctx.dispatch( new SetLoading(true) );
    const state = ctx.getState()

    setTimeout(() => {
      ctx.dispatch( new SetLoading(false) )

      ctx.patchState({
        ...state,
        loadedProducts: state.loadedProducts + PRODUCTS_AMOUNT
      })
    }, 1000);
  }

  /** */
  @Selector<boolean>()
  static canLoadMore(state: ProductsStateModel) {
    const anyFilter = state.typeFilter !== null || state.searchText !== null

    return state.loadedProducts < state.allProducts.length && !anyFilter
  }
}
