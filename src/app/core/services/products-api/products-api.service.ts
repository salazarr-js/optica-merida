import { Injectable } from '@angular/core';

// THIRDs
import { Observable } from 'rxjs';
// MODELS
import { ApiResponse } from '@models/api-response';
// SERVICES
import { ApiService } from '@services/api/api.service';

/** SERVICE TO GET ALL PRODUCTS DATA */
@Injectable()
export class ProductsApiService {
  /** CREATE INSTANCE */
  constructor(private api: ApiService) {
  }
  
  /** GET ALL PRODUCTS FROM API */
  getAll(): Observable<ApiResponse> {
    return this.api.get('products');
  }
  
  /** GET PRODUCt DETAIL FROM API */
  getProduct(id: number): Observable<ApiResponse> {
    return this.api.get(`products/${id}`);
  }
}
