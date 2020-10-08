import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

// MODELS
import { Select, Store } from '@ngxs/store';
import { GetAllProducts, ProductsState, SetTypeFilter } from '@store/products';
import { Product, ProductTypes } from '@models/product';

/** HOME PAGE COMPONENT */
@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /** */
  public bgImg: string
  /** */
  public productTypes = ProductTypes;

  /** */
  @Select(ProductsState.filteredProducts) products$: Product[] ;
  /** */
  @Select(ProductsState.typeFilter) typeFilter$: ProductTypes;


  /** */
  constructor(
    private store: Store
  ) { }

  /** */
  ngOnInit(): void {
    this.getBgImg();

    this.store.dispatch( new GetAllProducts() );
  }

  /** */
  public productsTrackByFn(index: number, product: Product): number {
    return product.id;
  }


  /** */
  getBgImg(): void {
    let type = Math.random() > .5 ? 'frame' : 'sun';
    let num = Math.floor(Math.random() * (6 - 1 + 1)) + 1;

    this.bgImg =`assets/images/${type}-${num}.jpg`;
  }

  /** */
  public setTypeFilter(filter: ProductTypes): void {
    this.store.dispatch( new SetTypeFilter(filter) );
  }
}
