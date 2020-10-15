import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
/** THIRD */
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
/** STORE */
import { Select, Store } from '@ngxs/store';
import { SetLoading } from '@app/core/store/loading';
import { StateReset } from 'ngxs-reset-plugin';
import { 
  CartState, GetDetailedProducts,
  AddProduct, SubstractProduct, RemoveProduct, BuyProducts
} from '@store/cart';
/** MODELS */
import { Product } from '@models/product';
/** HELPERS */
import { applyDiscount } from '@helpers/index';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ROUTES_NAMES } from '@app/routes/routes';

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
  @Select(CartState.isValid) isInvalid$: Observable<boolean>;
  /** */
  @Select(CartState.isLoading) isLoading$: Observable<boolean>;

  /** */
  constructor(
    private store: Store,
    private auth: AngularFireAuth, 
    private router: Router
  ) {
    this.products = [];
  }

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
    this.store.dispatch( new SetLoading(true) );

    this.auth.currentUser
    .then(user => {

      if ( user ) {
        this.store.dispatch( new BuyProducts() )
          .pipe( untilDestroyed(this) )
          .subscribe(data =>  {
            this.successSwal.fire();
            this.store.dispatch( new SetLoading(false) );
          });
      } else {
        this.router.navigate(['/', ROUTES_NAMES.SIGN_IN]);
        this.store.dispatch( new SetLoading(false) );
      }

    }).catch(error => {
      console.log("CURRENT USER ERROR", error);
      this.store.dispatch( new SetLoading(false) );
    });
  }

  /** */
  finishBuy(): void {
    this.store.dispatch( new StateReset(CartState) );
    this.router.navigate(['/']);
  }
}
