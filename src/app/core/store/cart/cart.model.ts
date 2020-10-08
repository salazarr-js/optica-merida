import { HttpErrorResponse } from '@angular/common/http';

import { Product } from '@models/product';

/** PLANS STATE MODEL */
export interface CartStateModel {
  /** PRODUCTS IN CART WITH DETAILS */
  products: Product[];

  /** IS FILLED STATE */
  filled: boolean;
  /** IS LOADING STATE */
  loading: boolean;
  /** REQUEST ERROR RESPONSE */
  error: HttpErrorResponse;
}
