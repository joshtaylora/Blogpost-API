import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @HostListener('mouseover')
  onMouseOver(): void {
    this.renderer.setStyle(
      this.elr.nativeElement,
      'background-color',
      '#fabd2f'
    );
    const title = this.elr.nativeElement.querySelector('span');
    this.renderer.setStyle(title, 'color', '#1d2021');
    this.renderer.setStyle(this.elr.nativeElement, 'color', '#1d2021');
  }
  @HostListener('mouseout')
  onMouseOut(): void {
    this.renderer.setStyle(this.elr.nativeElement, 'background-color', null);
    const title = this.elr.nativeElement.querySelector('span');
    this.renderer.setStyle(title, 'color', null);
  }

  @HostListener('select')
  onSelect(): void {
    this.renderer.setStyle(
      this.elr.nativeElement,
      'background-color',
      '#fb4934'
    );
    const title = this.elr.nativeElement.querySelector('span');
    this.renderer.setStyle(title, 'color', '#928374');
  }
  constructor(private elr: ElementRef, private renderer: Renderer2) {}

  updateItem(bColor: string | null, tColor: string | null): void {
    // let postTitle = this.elr.nativeElement
  }
}
