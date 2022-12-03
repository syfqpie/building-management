import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges } from '@angular/core';

import { TicketCategory } from '../services/ticket/ticket.model';
import { TicketCategoryPipe } from '../handlers/pipes/ticket-category.pipe';

@Directive({
  selector: '[tixCategory]'
})
export class TicketCategoryDirective implements OnChanges {

  @Input()
  tixCategory: TicketCategory | undefined

  spanRef: ElementRef | undefined
  spanText: ElementRef | undefined
  iconRef: ElementRef | undefined

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private categoryPipe: TicketCategoryPipe
  ) {
    this.setBaseClass()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['tixCategory'].currentValue !== null &&
      (changes['tixCategory'].previousValue === null ||
      changes['tixCategory'].previousValue === undefined)
    ) {
      this.initDirective(Number(changes['tixCategory'].currentValue))
    } else if (
      changes['tixCategory'].currentValue !== null &&
      changes['tixCategory'].previousValue !== null &&
      changes['tixCategory'].currentValue !== undefined
    ) {
      this.updateDirective(
        Number(changes['tixCategory'].previousValue),
        Number(changes['tixCategory'].currentValue)
      )
    }
  }

  setBaseClass() {
    const defaultClass = 'mb-0 small d-inline-flex \
      px-2 py-1 bg-opacity-10 border border-opacity-10 rounded-2'
    if (this.el.nativeElement.className === '') {
      this.el.nativeElement.className = defaultClass
    } else {
      this.el.nativeElement.className = `${ defaultClass } ${ this.el.nativeElement.className }`
    }
  }

  getThemeName(stat: TicketCategory) {
    if (stat === TicketCategory.SYS) return 'primary'
    else if (stat === TicketCategory.UNIT) return 'info'
    else if (stat === TicketCategory.FACI) return 'dark'
    else return 'primary'
  }

  addColorClass(stat: TicketCategory) {
    const theme = this.getThemeName(stat)
    this.renderer.addClass(this.el.nativeElement, `bg-${ theme }`)
    this.renderer.addClass(this.el.nativeElement, `text-${ theme }`)
  }

  removeColorClass(stat: TicketCategory) {
    const theme = this.getThemeName(stat)
    this.renderer.removeClass(this.el.nativeElement, `bg-${ theme }`)
    this.renderer.removeClass(this.el.nativeElement, `text-${ theme }`)
  }

  initDirective(current: TicketCategory) {
    this.addColorClass(current)

    // Create span related text and elements
    this.spanRef = this.renderer.createElement('span')
    this.spanText = this.renderer.createText(this.categoryPipe.transform(current))

    // Create icon related element and class
    this.iconRef = this.renderer.createElement('i')
    this.renderer.addClass(this.iconRef, 'me-1')
    this.renderer.addClass(this.iconRef, 'fa-solid')
    this.renderer.addClass(this.iconRef, 'fa-circle-exclamation')

    // Append children
    this.renderer.appendChild(this.spanRef, this.iconRef)
    this.renderer.appendChild(this.spanRef , this.spanText)
    this.renderer.appendChild(this.el.nativeElement, this.spanRef)
  }

  updateDirective(previous: TicketCategory, current: TicketCategory) {
    // Remove previous
    this.removeColorClass(previous)
    this.renderer.removeChild(this.spanRef , this.spanText)

    // Update current
    this.addColorClass(current)
    this.spanText = this.renderer.createText(this.categoryPipe.transform(current))
    this.renderer.appendChild(this.spanRef , this.spanText)
  }
}
