import { Component, Input, OnInit } from '@angular/core';

/** PRODUCT PRICE COMPONENT */
@Component({
  selector: 'product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss']
})
export class ProductPriceComponent implements OnInit {
  /** PRICE VALUE */
  @Input() value: number;
  /** IF PRICE HAVE A LINE THORUGHT */
  @Input() lined: boolean;
  
  /** */
  constructor() { }
  
  /** */
  ngOnInit(): void {
  }

  /** RETURN PRICE INT PART */
  public get fraction(): number {
    return this.value ? Math.trunc(this.value) : null;
  }

  /** RETORN PRICE FOAT PART */
  public get cents(): string {
    return this.value ? (this.value % 1).toFixed(2).substring(2) : null;
  }
}
