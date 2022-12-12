import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

// MODELS
import { Select, Store } from '@ngxs/store';
import { GetAllProducts, ProductsState, RemoveSearchText, RemoveTypeFilter, SetSearchable, SetTypeFilter } from '@store/products';
import { Product, ProductTypes } from '@models/product';

/** HOME PAGE COMPONENT */
@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  /** */
  public bgImg: string
  /** */
  public productTypes = ProductTypes;
  /** */
  public typeFilter: ProductTypes;
  /** */
  // @Select(ProductsState.filteredProducts) products$: Product[] ;
  /** */
  public products: Product[] ;

  /** */
  constructor(
    private store: Store
  ) { }

  /** */
  ngOnInit(): void {
    this.getBgImg();

    this.store.dispatch([ new GetAllProducts(), new SetSearchable(true)]);

    this.store.select( ProductsState.filteredProducts )
      .pipe( untilDestroyed(this) )
      .subscribe(typeFilter => this.products = typeFilter);

    this.store.select( ProductsState.typeFilter )
      .pipe( untilDestroyed(this) )
      .subscribe(typeFilter => this.typeFilter = typeFilter);

    this.clearFilters()
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
    if ( this.typeFilter === filter)
      this.store.dispatch( new RemoveTypeFilter() );
    else
      this.store.dispatch( new SetTypeFilter(filter) );
  }

  /** */
  public clearFilters(): void {
    this.store.dispatch([new RemoveSearchText(), new RemoveTypeFilter()]);
  }

  /** */
  ngOnDestroy(): void {
    this.store.dispatch([new RemoveSearchText(), new RemoveTypeFilter(), new SetSearchable(false)]);
  }
}
