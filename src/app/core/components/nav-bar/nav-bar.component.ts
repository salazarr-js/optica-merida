import { Component, OnInit } from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
// STORE
import { Store } from '@ngxs/store'
import { CartState } from '@store/cart';
/** CONSTs & MODELS */
import { ROUTES_NAMES } from '@routes/routes';


/** NAV BAR COMPONENT */
@UntilDestroy()
@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  /** */
  public cartProducts: number;
  /** */
  public urls = {
    home: ['/', ROUTES_NAMES.HOME],
    cart: ['/', ROUTES_NAMES.CART]
  };

  /** */
  constructor(
    private store: Store
  ) { 
  }

  /** */
  ngOnInit(): void {
    this.store.select( CartState.products )
    .pipe( untilDestroyed(this) )
    .subscribe(products => this.cartProducts = products);
  }

}
