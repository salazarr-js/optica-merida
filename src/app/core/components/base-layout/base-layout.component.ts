import { Component, OnInit } from '@angular/core';

/** STORE */
import { Select, Store } from '@ngxs/store';
import { CartState } from '@app/core/store/cart';
/** CONSTs & MODELS */
import { Product } from '@app/models/product';
import { ROUTES_NAMES } from '@app/routes/routes';
import { Observable } from 'rxjs';

/** */
@Component({
  selector: 'base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {
  public urls = {
    home: ['/', ROUTES_NAMES.HOME ],
    product: ['/', ROUTES_NAMES.PRODUCT, 1 ],
    cart: ['/', ROUTES_NAMES.CART ]
  };

  /** */
  @Select(CartState.products) products$: Observable<Product>;

  /** */
  constructor(
    private store: Store
  ) {
    // this.isLoading = false;
  }

  /** */
  ngOnInit() {
    // this.store.select( FlagStatusState ).subscribe(() => {
    //   const isProgress = this.store.selectSnapshot( FlagStatusState );
    //   this.isLoading = isProgress.progressBar;
    // });
  }
}
