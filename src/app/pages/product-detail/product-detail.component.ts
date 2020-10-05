import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAMES } from '@app/routes/routes';

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
    private router: Router
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
}
