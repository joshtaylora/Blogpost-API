import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPostsLink]',
})
export class PostsLinkDirective {
  @HostListener('mouseover')
  onMouseOver(): void {
    this.changeColor('#b16286');
  }
  @HostListener('mouseout')
  onMouseOut(): void {
    this.changeColor('#d3869b');
  }
  constructor(private elr: ElementRef, private renderer: Renderer2) {}
  private changeColor(color: string): void {
    this.renderer.setStyle(this.elr.nativeElement, 'color', color);
  }
}
