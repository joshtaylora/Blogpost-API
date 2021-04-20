import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSelectPost]',
})
export class SelectPostDirective {
  constructor(private elr: ElementRef, private renderer: Renderer2) {}
}
