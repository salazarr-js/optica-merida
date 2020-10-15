import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

// STORE
import { Store } from '@ngxs/store';
import { AddProduct, CartState } from '@store/cart';
import { SetLoading } from '@store/loading';
// SERVICES & HELPERS
import { ProductsApiService } from '@core/services';
import { applyDiscount } from '@helpers/index';
// MODELS & CONSTS
import { Product } from '@models/product';
import { ROUTES_NAMES } from '@routes/routes';



/** PRODUCT DETAIL COMPONENT */
@UntilDestroy()
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  /** DETAILED PRODUCT */
  public product: Product;
  /**  */
  public canAdd: boolean;

  /** */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private productsApi: ProductsApiService
  ) { 
    this.canAdd = false;
  }

  /** */
  ngOnInit(): void {
    this.store.dispatch( new SetLoading(true) );

    this.getId()
    .pipe(
      untilDestroyed(this),
      switchMap(id => this.productsApi.getProduct(id))
    ).subscribe(response => {
      this.product = response.data.product;
      this.validateStock();

      this.store.dispatch( new SetLoading(false) );
    }, error => {
      this.router.navigate(['/', ROUTES_NAMES.NOT_FOUND]);
      this.store.dispatch( new SetLoading(false) );
    });
  }

  /** GET PRODUCT ID FORM URL */
  public getId(): Observable<number> {
    return this.route.params.pipe(
      map(params => {
        const id = parseInt(params['id']) ;
        
        if ( !isNaN(id) && id > 0 ) {
          return id;
        } else {
          console.error(`ERROR WITH PARAM ID [${params['id']}], REDIRECTING...`);
          this.router.navigate(['/', ROUTES_NAMES.NOT_FOUND]);
          return null; 
        }
      })
    );
  }

  /** */
  public validateStock(): void {
    this.store.select( CartState.products )
    .pipe( untilDestroyed(this) )
    .subscribe(products => {
      const p = products.find(p => this.product.id === p.id) || null;
      
      if ( p ) {
        if ( this.product.stock > p.amount ) {
          this.canAdd = true;
        } else {
          this.canAdd = false;
        }
      } else if ( this.product.stock ){
        this.canAdd = true;
      } else {
        this.canAdd = false;
      }
    });
  }

  lorem(products: Product[]): void {
    
  }

  /** */
  public get priceDiscount(): number {
    return applyDiscount(this.product.price, this.product.discount)
  }

  /** */
  public addToCart(): void {
    this.store.dispatch( new AddProduct(this.product.id) );
  }
}
