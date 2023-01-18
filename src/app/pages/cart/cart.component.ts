import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

/** THIRD */
import { Auth, authState, User } from '@angular/fire/auth'
import { Observable } from 'rxjs';
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
import { ROUTES_NAMES } from '@app/routes/routes';
/** HELPERS */
import { EmailApiService } from '@app/core/services/email-api/email-api.service';
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

  @Select(CartState.totalPrice) totalPrice$: Observable<number>;
  @Select(CartState.isValid) isInvalid$: Observable<boolean>;
  @Select(CartState.isLoading) isLoading$: Observable<boolean>;

  public products: Product[];
  public user: User

  /** */
  constructor(
    private store   : Store,
    private router  : Router,
    private auth    : Auth,
    private emailApi: EmailApiService
  ) {
    this.products = [];
  }

  /** */
  ngOnInit(): void {
    this.store.dispatch( new GetDetailedProducts() );

    this.store.select( CartState.products )
    .pipe( untilDestroyed(this) )
    .subscribe(products => this.products = products);

    authState(this.auth)
      .pipe( untilDestroyed(this) )
      .subscribe(user => this.user = user);
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

    if ( this.user ) {
      this.store.dispatch( new BuyProducts() )
      .pipe( untilDestroyed(this) )
      .subscribe(_ =>  {
        this.sendEmail();
        this.successSwal.fire();
        this.store.dispatch( new SetLoading(false) );
      });
    } else {
      this.router.navigate(['/', ROUTES_NAMES.SIGN_IN]);
      this.store.dispatch( new SetLoading(false) );
    }
  }

  /** */
  finishBuy(): void {
    this.router.navigate(['/']);
    this.store.dispatch( new StateReset(CartState) );
    this.store.dispatch( new SetLoading(false) );
  }


  /** */
  sendEmail(): void {
    const mail = {
      to: this.user.email,
      name: this.user.displayName,
      products: this.products,
      total: this.store.selectSnapshot(CartState.totalPrice)
    };

    this.emailApi.sendInvoiceEmail(mail)
  }
}
