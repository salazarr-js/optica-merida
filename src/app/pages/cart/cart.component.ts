import { Component, OnInit } from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Store } from '@ngxs/store';
import { CartState } from '@store/cart';

import { ProductsApiService } from '@services/index';

/** CART PAGE COMPONENT*/
@UntilDestroy()
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  /** */
  constructor(
    private store: Store,
    private productsApi: ProductsApiService
  ) { }

  /** */
  ngOnInit(): void {

    // this.store.select( CartState.cartProducts )
    // .pipe( untilDestroyed(this) )
    // .subscribe(products => {
    //   console.warn("CART PRODUCTS", products );

    //   this.productsApi.getProducts( products.map(p => p.id) )
    //     .pipe( untilDestroyed(this) )
    //     .subscribe(response => {
    //       console.warn("PRODUCTS DETAIL", response);
    //     })

    //   this.productsApi.buyProducts(products)
    //   .pipe( untilDestroyed(this) )
    //   .subscribe(response => {
    //     console.warn("BUYED PRODUCTS", response);
    //   })

    //   this.productsApi.getProducts( products.map(p => p.id) )
    //     .pipe( untilDestroyed(this) )
    //     .subscribe(response => {
    //       console.warn("PRODUCTS DETAIL", response);
    //     })
    // });

  }
}
