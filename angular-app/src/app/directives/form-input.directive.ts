import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFormInput]',
})
export class FormInputDirective {
  @HostListener('focus')
  onFocus(): void {
    this.changeTextColor('#fbf1c7');
    this.changeBgColor('#3c3836');
    this.changeBoxShadow('0 0 0 0.2rem #458588');
  }
  @HostListener('blur')
  onBlur(): void {
    this.changeTextColor('#fbf1c7');
    this.changeBgColor('#3c3836');
    this.changeBorderColor('#665c54');
    this.changeBoxShadow(null);
  }
  constructor(private elr: ElementRef, private renderer: Renderer2) {}
  private changeTextColor(color: string) {
    this.renderer.setStyle(this.elr.nativeElement, 'color', color);
  }
  private changeBgColor(bgColor: string) {
    this.renderer.setStyle(this.elr.nativeElement, 'background-color', bgColor);
  }
  private changeBoxShadow(boxShadow: string) {
    this.renderer.setStyle(this.elr.nativeElement, 'box-shadow', boxShadow);
  }
  private changeBorderColor(borderColor: string) {
    this.renderer.setStyle(this.elr.nativeElement, 'border-color', borderColor);
  }
}
