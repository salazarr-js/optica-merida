import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { CartComponent } from './cart.component';


const routes: Routes = [
  { path: '', component: CartComponent }
];

/** CART PAGE LAZY MODULE */
@NgModule({
  declarations: [CartComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CartModule { }
