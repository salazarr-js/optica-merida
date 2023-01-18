import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseLayoutComponent } from '@core/components/base-layout/base-layout.component';

import { ROUTES_NAMES } from './routes';

/** BASE ROUTES*/
const ROUTES: Routes = [
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
    path: ROUTES_NAMES.SIGN_IN,
    loadChildren: () => import('@pages/sign-in/sign-in.module').then(m => m.SignInModule),
  },
  {
    path: ROUTES_NAMES.NOT_FOUND,
    loadChildren: () => import('@pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: '**', redirectTo: ROUTES_NAMES.NOT_FOUND
  }
];

/** ROUTER MODULE */
@NgModule({
  imports: [
    RouterModule.forRoot([
    {
        path: '',
        component: BaseLayoutComponent,
        children: [
            ...ROUTES
        ]
    }
], { relativeLinkResolution: 'legacy' })
  ],
  exports: []
})
export class AppRouterModule { }
