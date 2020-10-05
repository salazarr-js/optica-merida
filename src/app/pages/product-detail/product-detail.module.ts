import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

import { ProductDetailComponent } from './product-detail.component';

/** PAGE ROUTES */
const ROUTES: Routes = [
  { path: '', component: ProductDetailComponent }
];

/** PRODUCT DETAIL PAGE | LAZY LOADED FEATURE MODULE */
@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class ProductDetailModule { }
