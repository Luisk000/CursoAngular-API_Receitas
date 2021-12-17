import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'black';
  @Input() highlightColor: string = 'white';

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostBinding('style.color') color: string/*  = this.defaultColor */;

  @HostListener('mouseenter') mouseOver(eventData: Event){
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.color = this.highlightColor;
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event){
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'white');
    this.color = this.defaultColor;
  }

  ngOnInit(){
/*     this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white'); */
    this.color = this.defaultColor;
  }
}
