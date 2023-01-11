import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store, Actions, ofActionDispatched } from '@ngxs/store'
import { RemoveSearchText, SetSearchText } from '@store/products';

@UntilDestroy()
@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  /** */
  @Input() searchText: string

  constructor(private store: Store, private actions: Actions) {
  }

  ngOnInit(): void {
    this.clear()

    this.actions.pipe(
      ofActionDispatched(RemoveSearchText),
      untilDestroyed(this)
    ).subscribe(_ => this.searchText = '')
  }

  ngOnDestroy(): void {
    this.clear()
  }

  /** */
  search(): void {
    if ( this.searchText?.trim().length )
      this.store.dispatch( new SetSearchText(this.searchText) );
    else
      this.clear()
  }

  clear(): void {
    this.store.dispatch( new RemoveSearchText() );
  }

  focus(): void {
    document.querySelector<HTMLElement>('search-bar .searchbar-input').focus()
  }
}
