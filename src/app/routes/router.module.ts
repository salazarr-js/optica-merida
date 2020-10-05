import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES_NAMES } from './routes';

/** BASE ROUTES*/
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: ROUTES_NAMES.HOME },
  { 
    path: ROUTES_NAMES.HOME,
    loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule)
  },
  { 
    path: `${ROUTES_NAMES.PRODUCT}/:id`, 
    loadChildren: () => import('@pages/product-detail/product-detail.module').then(m => m.ProductDetailModule)
  },
  { 
    path: ROUTES_NAMES.CART, 
    loadChildren: () => import('@pages/cart/cart.module').then(m => m.CartModule)
  },
  { 
    path: '**',
    loadChildren: () => import('../pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

/** ROUTER MODULE */
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: []
})
export class AppRouterModule { }
