import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store'
import { RemoveSearchText, SetSearchText } from '@store/products';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  /** */
  @Input() searchText: string

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.clear()
  }

  ngOnDestroy(): void {
    this.clear()
  }

  /** */
  search(): void {
    const searchText = this.searchText?.trim()
    if ( searchText?.length ) {
      this.store.dispatch( new SetSearchText(this.searchText) );
    } else
      this.clear()
  }

  clear():void {
    this.searchText = ''
    this.store.dispatch( new RemoveSearchText() );
  }
}
