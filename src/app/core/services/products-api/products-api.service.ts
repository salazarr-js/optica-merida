import { Injectable } from '@angular/core';

// THIRDs
import { Observable } from 'rxjs';
// MODELS
import { ApiResponse } from '@models/api-response';
// SERVICES
import { ApiService } from '@services/api/api.service';
import { CartProduct } from '@app/models/product';

/** SERVICE TO GET ALL PRODUCTS DATA */
@Injectable()
export class ProductsApiService {
  /** CREATE INSTANCE */
  constructor(private api: ApiService) {
  }
  
  /** GET ALL PRODUCTS FROM API */
  public getAll(): Observable<ApiResponse> {
    return this.api.get('products');
  }
  
  /** GET PRODUCT DETAIL FROM API */
  public getProduct(id: number): Observable<ApiResponse> {
    return this.api.get(`product/${id}`);
  }

  /** GET SOME PRODUCTS DETAIL FROM API */
  public getProducts(products: number[]): Observable<ApiResponse> {
    return this.api.post(`products/detail`, { products });
  }

  /** BUY SOME PRODUCTS */
  public buyProducts(products: CartProduct[]): Observable<ApiResponse> {
    return this.api.post(`products/buy`, { products });
  }
}
