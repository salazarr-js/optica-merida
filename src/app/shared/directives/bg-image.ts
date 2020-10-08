import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

/** BACKGROUND IMAGE DIRECTIVE */
@Directive({
  selector: '[bg-image]'
})
export class BackgroundImageDirective {
  /** BACKGROUND IMAGE URL INPUT */
  @Input('bg-image') bgImage: string;
  /** ELEMENT */
  private el: HTMLElement;

  /** */
  constructor(private renderer: Renderer2, private elRef: ElementRef) {
    this.el = this.elRef.nativeElement;    
  }
  
  /** */
  ngAfterViewInit() {
    this.setBackgroundImage();
  }
  
  /** */
  ngOnChanges(changes: SimpleChanges) {
    if ( changes.bgImage ) {
      this.setBackgroundImage();
    }
  }
  
  /** */
  setBackgroundImage(){
    this.renderer.setStyle(this.el, "backgroundImage", `url(${ this.bgImage })`);
  }
}