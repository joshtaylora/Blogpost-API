import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUsersLink]',
})
export class UsersLinkDirective {
  @HostListener('mouseover')
  onMouseOver(): void {
    this.changeColor('#458588');
  }
  @HostListener('mouseout')
  onMouseOut(): void {
    this.changeColor('#83a598');
  }
  constructor(private elr: ElementRef, private renderer: Renderer2) {}

  private changeColor(color: string | null): void {
    this.renderer.setStyle(this.elr.nativeElement, 'color', color);
  }
}
