import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { Product } from '@models/product';
import { AddProduct, CartState } from '@core/store/cart';
import { ROUTES_NAMES } from '@routes/routes';

import { applyDiscount } from '@helpers/index';


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
  public timesAdded: number

  /** */
  constructor(private store: Store) {
    this.timesAdded = 0
  }

  /** */
  ngOnInit(): void {
    this.store.selectOnce(CartState.products)
    .subscribe(cartProducts => {
      const isInCart = cartProducts.find(p => p.id === this.product.id)
      if (isInCart)
        this.timesAdded = isInCart.amount
    })
  }

  /** RETURN THE DETAIL ROUTE URL */
  public get detailUrl() {
    return ['/', ROUTES_NAMES.PRODUCT, this.product.id || 1];
  }

  /** RETURN THE TOTAL FINAL PRICE */
  public get finalPrice(): number {
    return applyDiscount(this.product.price, this.product.amount);
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
  addToCart(ev): void {
    ev.preventDefault();
    ev.stopPropagation();

    this.timesAdded++
    this.store.dispatch( new AddProduct(this.product.id) );
  }
}
