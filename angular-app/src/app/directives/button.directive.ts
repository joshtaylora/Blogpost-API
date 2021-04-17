import {
  Directive,
  Input,
  HostListener,
  Renderer2,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appButton]',
})
export class ButtonDirective {
  @Input() mouseInColor: string;
  @Input() mouseOutColor: string;

  @HostListener('mouseover')
  onMouseOver(): void {
    this.updateColor(this.mouseInColor);
  }

  @HostListener('mouseout')
  onMouseOut(): void {
    this.updateColor(this.mouseOutColor);
  }

  constructor(private elr: ElementRef, private renderer: Renderer2) {}

  private updateColor(backgroundColor: string): void {
    this.renderer.setStyle(
      this.elr.nativeElement,
      'background-color',
      backgroundColor
    );
  }
}
