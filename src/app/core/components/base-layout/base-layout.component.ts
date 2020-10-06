import { Component, OnInit } from '@angular/core';

/** CONSTs & MODELS */
import { ROUTES_NAMES } from '@routes/routes';

/** */
@Component({
  selector: 'base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {
  public urls = {
    home: ['/', ROUTES_NAMES.HOME ],
    product: ['/', ROUTES_NAMES.PRODUCT, 1 ],
  };

  /** */
  constructor( ) {
    // this.isLoading = false;
  }

  /** */
  ngOnInit() {
    // this.store.select( FlagStatusState ).subscribe(() => {
    //   const isProgress = this.store.selectSnapshot( FlagStatusState );
    //   this.isLoading = isProgress.progressBar;
    // });
  }
}
