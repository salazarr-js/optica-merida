import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { Product } from '@app/models/product';
import { AddProduct } from '@app/core/store/cart';
import { ROUTES_NAMES } from '@app/routes/routes';


/** PRODUCT CARD COMPONENT */
@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {
  /** */
  @Input() product: Product;

  /** */
  constructor(private store: Store) { }
  
  /** */
  ngOnInit(): void {
  }

  /** RETURN THE DETAIL ROUTE URL */
  public get detailUrl() {
    return ['/', ROUTES_NAMES.PRODUCT, this.product.id || 1];
  }

  /** RETURN THE TOTAL FINAL PRICE */
  public get finalPrice(): number {
    const p = this.product;
    return (1 - p.discount/100) * p.price;
  }

  /** RETURN FIRST 2 IMAGES */
  public get images(): string[] {
    let images = [];
    for (let i of [0, 1]) {
      if ( this.product.images[i] ) {
        images.push( { backgroundImage: `url(${this.product.images[i]})` });
      }
    }

    return images;
  }

  /** ADD PRODUCT TO CART */
  addToCart(): void {
    this.store.dispatch( new AddProduct(this.product.id || 1) );
  }
}
