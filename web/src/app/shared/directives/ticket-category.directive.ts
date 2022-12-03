import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges } from '@angular/core';

  import { BadgeDirective } from './base/badge.directive';
import { TicketCategory } from '../services/ticket/ticket.model';
import { TicketCategoryPipe } from '../handlers/pipes/ticket-category.pipe';

@Directive({
  selector: '[badgeTicketCategory]'
})
export class TicketCategoryDirective extends BadgeDirective {

  @Input()
  badgeTicketCategory: TicketCategory | undefined

  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private categoryPipe: TicketCategoryPipe
  ) {
    super(el, renderer)
    this.setBaseClass()
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['badgeTicketCategory'].currentValue !== null &&
      (changes['badgeTicketCategory'].previousValue === null ||
      changes['badgeTicketCategory'].previousValue === undefined)
    ) {
      this.initDirective(Number(changes['badgeTicketCategory'].currentValue))
    } else if (
      changes['badgeTicketCategory'].currentValue !== null &&
      changes['badgeTicketCategory'].previousValue !== null &&
      changes['badgeTicketCategory'].currentValue !== undefined
    ) {
      this.updateDirective(
        Number(changes['badgeTicketCategory'].previousValue),
        Number(changes['badgeTicketCategory'].currentValue)
      )
    }
  }

  override getThemeName(stat: TicketCategory) {
    if (stat === TicketCategory.SYS) return 'primary'
    else if (stat === TicketCategory.UNIT) return 'info'
    else if (stat === TicketCategory.FACI) return 'dark'
    else return 'primary'
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
