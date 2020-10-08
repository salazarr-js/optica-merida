import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { Select, Store } from '@ngxs/store';
import { LoadingState } from '@app/core/store/loading';
import { StateReset } from 'ngxs-reset-plugin';
import { 
  CartState, GetDetailedProducts,
  AddProduct, SubstractProduct, RemoveProduct, BuyProducts
} from '@store/cart';
import { Product } from '@models/product';
// HELPERS
import { applyDiscount } from '@helpers/index';

/** CART PAGE COMPONENT*/
@UntilDestroy()
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('successSwal') private successSwal: SwalComponent;
  /** */
  public products: Product[];
  /** */
  @Select(CartState.totalPrice) totalPrice$: Observable<number>;
  /** */
  @Select(LoadingState.isLoading) isLoading$: Observable<boolean>;

  /** */
  constructor(
    private store: Store,
    private router: Router
  ) { }

  /** */
  ngOnInit(): void {
    this.store.dispatch( new GetDetailedProducts() );

    this.store.select( CartState.products )
    .pipe( untilDestroyed(this) )
    .subscribe(products => this.products = products);
  }

   /** RETURN THE TOTAL FINAL PRICE */
  public finalPrice(price: number, discount: number): number {
    return applyDiscount(price, discount);
  }

  /** */
  public incProductAmount(id: number): void {
    this.store.dispatch( new AddProduct(id) );
  }
  
  /** */
  public decProductAmount(id: number): void {
    this.store.dispatch( new SubstractProduct(id) );
  }
  
  /** */
  public removeProduct(id: number): void {
    this.store.dispatch( new RemoveProduct(id) );
  }

  /** */
  public firstImage(urls: string[]): string {
    return urls ? urls[0] : '';
  }

  /** */
  buy(): void {
    this.store.dispatch( new BuyProducts() )
    .pipe( untilDestroyed(this) )
    .subscribe(data =>  this.successSwal.fire());
  }

  /** */
  finishBuy(): void {
    this.store.dispatch( new StateReset(CartState) );
    this.router.navigate(['/']);
  }
}
