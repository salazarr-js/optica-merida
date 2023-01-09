import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

// MODELS
import { Select, Store } from '@ngxs/store';
import {
  GetAllProducts, ProductsState, RemoveSearchText,
  RemoveTypeFilter, SetSearchable, SetTypeFilter,
  LoadMoreProducts
} from '@store/products';
import { Product, ProductTypes } from '@models/product';
import { Observable } from 'rxjs';

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
  public typeFilter: ProductTypes;
  /** */
  // @Select(ProductsState.filteredProducts) products$: Product[] ;
  /** */
  @Select(ProductsState.canLoadMore) canLoadMore$: Observable<boolean>;
  /** */
  public products: Product[] ;

  public filtersButtons: any[]

  /** */
  constructor(
    private store: Store
  ) {
    this.filtersButtons = [
      { text: 'Armazones de receta', value: ProductTypes.frame },
      { text: 'Lentes de Sol', value: ProductTypes.sun },
      { text: 'Lentes de Contacto', value: ProductTypes.contact },
    ]
  }

  /** */
  ngOnInit(): void {
    this.getBgImg();

    this.store.dispatch([ new GetAllProducts(), new SetSearchable(true)]);

    this.store.select( ProductsState.filteredProducts )
      .pipe( untilDestroyed(this) )
      .subscribe(products => this.products = products);

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
  trackByItems(_: number, product: Product): string {
    return `${product.id} ${product.cod}`;
  }

  /** */
  ngOnDestroy(): void {
    this.store.dispatch([new RemoveSearchText(), new RemoveTypeFilter(), new SetSearchable(false)]);
  }

  /** */
  public loadMore() {
    this.store.dispatch(new LoadMoreProducts())
  }
}
