import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// STORE
import { Select, Store } from '@ngxs/store'
import { CartState } from '@store/cart';
import { LoadingState, SetLoading } from '@store/loading';
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
  @Select(CartState.totalProducts) products$: Observable<number>;
  /** */
  // public user$: Observable<firebase.User>
  public user$: Observable<any>


  /** REDIRECT URLs */
  public urls = {
    home: ['/', ROUTES_NAMES.HOME],
    cart: ['/', ROUTES_NAMES.CART]
  };

  /** */
  constructor(
    // private auth: AngularFireAuth,
    private store: Store
  ) {
    // this.user$ = this.auth.user;
  }

  /** */
  ngOnInit(): void {
  }

  /** */
  singOut(): void {
    this.store.dispatch( new SetLoading(true) );

    // this.auth.signOut().then(() => {
    //   console.log("SIGN OUT SUCCESSFUL");
    //   this.store.dispatch( new SetLoading(false) );
    // });
  }
}
