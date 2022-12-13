import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {
  public show: boolean

  constructor() { }

  ngOnInit(): void {
    this.show = false

    fromEvent(window, 'scroll', { passive: true })
    .pipe( untilDestroyed(this) )
    .subscribe(_ => {
      this.show = window.scrollY > window.innerHeight
    })
  }

  /** */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth'})
  }
}
