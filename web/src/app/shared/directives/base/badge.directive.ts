import {
  Directive,
  ElementRef,
  OnChanges,
  Renderer2,
  SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBadge]'
})
export class BadgeDirective implements OnChanges {

  spanRef: ElementRef | undefined
  spanText: ElementRef | undefined
  iconRef: ElementRef | undefined

  constructor(
    protected el: ElementRef,
    protected renderer: Renderer2
  ) { }

  ngOnChanges(changes: SimpleChanges): void { }

  setBaseClass() {
    const defaultClass = 'mb-0 small d-inline-flex \
      px-2 py-1 bg-opacity-10 border border-opacity-10 rounded-2'
    if (this.el.nativeElement.className === '') {
      this.el.nativeElement.className = defaultClass
    } else {
      this.el.nativeElement.className = `${ defaultClass } ${ this.el.nativeElement.className }`
    }
  }

  getThemeName(param: any) {
    return 'primary'
  }

  getThemeIcon(param: any) {
    return 'fa-circle-exclamation'
  }

  addColorClass(param: any) {
    const theme = this.getThemeName(param)
    this.renderer.addClass(this.el.nativeElement, `bg-${ theme }`)
    this.renderer.addClass(this.el.nativeElement, `text-${ theme }`)
    this.renderer.addClass(this.el.nativeElement, `border-${ theme }`)
  }

  removeColorClass(param: any) {
    const theme = this.getThemeName(param)
    this.renderer.removeClass(this.el.nativeElement, `bg-${ theme }`)
    this.renderer.removeClass(this.el.nativeElement, `text-${ theme }`)
    this.renderer.addClass(this.el.nativeElement, `border-${ theme }`)
  }

}
