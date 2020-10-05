import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngxs/store';
import { AddProduct } from '@store/cart';

import { ROUTES_NAMES } from '@routes/routes';

/** PRODUCT DETAIL COMPONENT */
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  /** PRODUCT ID*/
  public id: number;

  /** */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { 
  }

  /** */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = parseInt(params['id']) ;
      if ( !isNaN(id) && id > 0 ) {
        this.id = id
      } else {
        console.error(`ERROR WITH PARAM ID [${params['id']}], REDIRECTING...`);
        this.router.navigate(['/', ROUTES_NAMES.NOT_FOUND]);
      }
    });
  }

  /** */
  public addToCart(): void {
    this.store.dispatch( new AddProduct(this.id) )

  }
}
