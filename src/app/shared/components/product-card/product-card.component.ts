import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { Product } from '@app/models/product';
import { AddProduct } from '@app/core/store/cart';


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

    console.log("PRODUCT: ", this.product);
  }

  /** */
  public get detailUrl() {
    return ['/', 'product', this.product.id || 1];
  }

  /** */
  public get finalPrice(): number {
    const p = this.product;

    return (1 - p.discount/100) * p.price;
  }

  /** */
  public get images(): string[] {
    let images = [];
    for (let i of [0, 1]) {
      if ( this.product.images[i] ) {
        images.push( { backgroundImage: `url(${this.product.images[i]})` });
      }
    }

    return images;
  }

  /** */
  addToCart(): void {
    this.store.dispatch( new AddProduct(this.product.id || 1) );
  }
}
