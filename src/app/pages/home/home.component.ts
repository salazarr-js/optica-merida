import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ProductsApiService } from '@app/core/services';
// MODELS
import { Product } from '@app/models/product';
import { Store } from '@ngxs/store';
import { SetLoading } from '@app/core/store/loading';

/** HOME PAGE COMPONENT */
@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public products: Product[] = [];

  public bgImg: string

  /** */
  constructor(
    private productsApi: ProductsApiService,
    private store: Store
  ) { }

  /** */
  ngOnInit(): void {
    this.getBgImg();
    this.store.dispatch( new SetLoading(true) );

    this.productsApi.getAll()
    .pipe( untilDestroyed(this) )
    .subscribe(response => {
      this.products = response.data.products;

      this.store.dispatch( new SetLoading(false) );
    })
  }

  /** */
  public productsTrackByFn(index: number, product: Product): number {
    return product.id;
  }


  getBgImg(): void {
    let type = Math.random() > .5 ? 'frame' : 'sun';
    let num = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    this.bgImg =`url(/assets/images/${type}-${num}.jpg)`;
  }
}
