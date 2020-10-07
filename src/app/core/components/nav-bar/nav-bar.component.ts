import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// STORE
import { Select } from '@ngxs/store'
import { CartState } from '@store/cart';
import { LoadingState } from '@store/loading';
/** CONSTs & MODELS */
import { ROUTES_NAMES } from '@routes/routes';


/** NAV BAR COMPONENT */
@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  /** LOADING STATE */
  @Select(LoadingState.isLoading) isLoading$: Observable<boolean>;
  /** TOTAL OF PRODUCTS ON CART */
  @Select(CartState.products) cartProducts$: Observable<number>;
  // public cartProducts: number;

  /** REDIRECT URLs */
  public urls = {
    home: ['/', ROUTES_NAMES.HOME],
    cart: ['/', ROUTES_NAMES.CART]
  };

  /** */
  constructor() { 
  }

  /** */
  ngOnInit(): void {
  }
}
