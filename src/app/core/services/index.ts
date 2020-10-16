import { Provider } from '@angular/core';

import { ApiService } from './api/api.service';
import { ProductsApiService } from './products-api/products-api.service';
import { EmailApiService } from './email-api/email-api.service';

/** GROUP/EXPORT ALL APP WIDE SERVICEs */
export const CORE_SERVICES: Array<Provider> = [
  ApiService,
  ProductsApiService,
  EmailApiService
];

// EXPORTS
export * from './api/api.service';
export * from './products-api/products-api.service';