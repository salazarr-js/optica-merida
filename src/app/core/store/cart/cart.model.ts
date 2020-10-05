import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '@app/models/product';

/** PLANS STATE MODEL */
export interface CartStateModel {
  /** ENTITY STATE   */
  products: number[];
  //TODO: DEBERIA SER UN OBJETO CON `id` & `amount`

  /** PRODUCTS WITH DETAILS */
  detailedProducts: Product[];

  /** IS FILLED STATE */
  filled: boolean;
  /** IS LOADING STATE */
  loading: boolean;
  /** REQUEST ERROR RESPONSE */
  error: HttpErrorResponse;
}
