import { HttpErrorResponse } from '@angular/common/http';

import { CartProduct, Product } from '@models/product';

/** PLANS STATE MODEL */
export interface CartStateModel {
  /** PRODUCTS IN CART */
  cartProducts: CartProduct[];
  /** PRODUCTS WITH DETAILS */
  detailedProducts: Product[];

  /** IS FILLED STATE */
  filled: boolean;
  /** IS LOADING STATE */
  loading: boolean;
  /** REQUEST ERROR RESPONSE */
  error: HttpErrorResponse;
}
