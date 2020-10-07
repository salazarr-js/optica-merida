import { Injectable } from '@angular/core';

// STORE
import {
  State, Action,
  Selector, StateContext
} from '@ngxs/store';
// ACTIONS
import { SetLoading } from './loading.actions';

/** SITES STORE */
@State<boolean>({
  name: 'loading',
  defaults: false
})
@Injectable()
export class LoadingState {
  /** CONSTRUCTOR */
  constructor() {}

  /** RETURN IF LOADING */
  @Selector<boolean>()
  static isLoading(state: boolean) {
    return state;
  }

  /** ADD PRODUCT ID TO CART STATE */
  @Action(SetLoading)
  public setLoading(ctx: StateContext<boolean>, { isLoading }: SetLoading) {
    ctx.setState(isLoading);
  }
}
