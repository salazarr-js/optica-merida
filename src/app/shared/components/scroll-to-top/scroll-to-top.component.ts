import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { state, style, trigger, transition, animate } from '@angular/animations'

@UntilDestroy()
@Component({
  selector: 'scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
  animations: [
    trigger('fadeInOutAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale3D(0, 0, 1)' }),
        animate('0.2s ease', style({ opacity: 1, transform: 'scale3D(1, 1, 1)' }))
      ]),

      transition(':leave', [
        style({ opacity: 1, transform: 'scale3D(1, 1, 1)' }),
        animate('0.2s ease', style({ opacity: 0, transform: 'scale3D(0, 0, 1)' }))
      ]),
    ])

  ]
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
