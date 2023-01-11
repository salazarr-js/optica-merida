import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Auth, authState, User, signOut } from '@angular/fire/auth';
// STORE
import { Select, Store } from '@ngxs/store'
import { CartState } from '@store/cart';
import { LoadingState, SetLoading } from '@store/loading';
/** CONSTs & MODELS */
import { ROUTES_NAMES } from '@routes/routes';
import { ProductsState } from '@app/core/store/products';


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
  @Select(CartState.totalProducts) products$: Observable<number>;
  /** */
  @Select(ProductsState.isSearchable) isSearchable$: Observable<boolean>;
  /** */
  public user$: Observable<User>


  /** REDIRECT URLs */
  public urls = {
    home: ['/', ROUTES_NAMES.HOME],
    cart: ['/', ROUTES_NAMES.CART]
  };

  /** */
  constructor(
    private auth: Auth,
    private store: Store
  ) {
    this.user$ = authState(this.auth);
  }

  /** */
  ngOnInit(): void {
  }

  /** */
  singOut(): void {
    this.store.dispatch( new SetLoading(true) );

    signOut(this.auth)
      .then(() => {
        console.log("SIGN OUT SUCCESSFUL");
        this.store.dispatch( new SetLoading(false) );
      });
  }
}
