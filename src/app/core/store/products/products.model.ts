import { HttpErrorResponse } from '@angular/common/http';

import { Product, ProductTypes } from '@models/product';

/** PLANS STATE MODEL */
export interface ProductsStateModel {
  /** PRODUCTS */
  products: Product[];
  /** PRODUCTS TYPE FILTER */
  typeFilter: ProductTypes;

  /** IS FILLED STATE */
  filled: boolean;
  /** IS LOADING STATE */
  loading: boolean;
  /** REQUEST ERROR RESPONSE */
  error: HttpErrorResponse;
}
