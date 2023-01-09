import { HttpErrorResponse } from '@angular/common/http';

import { Product, ProductTypes } from '@models/product';

/** PLANS STATE MODEL */
export interface ProductsStateModel {
  /** */
  loadedProducts: Product[];
  /** */
  allProducts: Product[];
  /** PRODUCTS TYPE FILTER */
  typeFilter: ProductTypes;
  /** */
  searchText: string
  /** Activate/Disable `searchbar` */
  searchable: boolean

  /** IS FILLED STATE */
  filled: boolean;
  /** IS LOADING STATE */
  loading: boolean;
  /** REQUEST ERROR RESPONSE */
  error: HttpErrorResponse;
}
