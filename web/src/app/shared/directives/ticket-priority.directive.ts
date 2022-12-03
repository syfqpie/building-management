import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges } from '@angular/core';

import { BadgeDirective } from './base/badge.directive';
import { TicketPriority } from '../services/ticket/ticket.model';
import { TicketPriorityPipe } from '../handlers/pipes/ticket-priority.pipe';

@Directive({
  selector: '[badgeTicketPriority]'
})
export class TicketPriorityDirective extends BadgeDirective {

  @Input()
  badgeTicketPriority: TicketPriority | undefined

  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private priorityPipe: TicketPriorityPipe
  ) {
    super(el, renderer)
    this.setBaseClass()
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['badgeTicketPriority'].currentValue !== null &&
      (changes['badgeTicketPriority'].previousValue === null ||
      changes['badgeTicketPriority'].previousValue === undefined)
    ) {
      this.initDirective(Number(changes['badgeTicketPriority'].currentValue))
    } else if (
      changes['badgeTicketPriority'].currentValue !== null &&
      changes['badgeTicketPriority'].previousValue !== null &&
      changes['badgeTicketPriority'].currentValue !== undefined
    ) {
      this.updateDirective(
        Number(changes['badgeTicketPriority'].previousValue),
        Number(changes['badgeTicketPriority'].currentValue)
      )
    }
  }

  override getThemeName(stat: TicketPriority) {
    if (stat === TicketPriority.CRIT) return 'danger'
    else if (stat === TicketPriority.HIGH) return 'warning'
    else if (stat === TicketPriority.NORMAL) return 'primary'
    else if (stat === TicketPriority.LOW) return 'info'
    else if (stat === TicketPriority.VLOW) return 'secondary'
    else return 'primary'
  }

  initDirective(current: TicketPriority) {
    this.addColorClass(current)

    // Create span related text and elements
    this.spanRef = this.renderer.createElement('span')
    this.spanText = this.renderer.createText(this.priorityPipe.transform(current))

    // Create icon related element and class
    this.iconRef = this.renderer.createElement('i')
    this.renderer.addClass(this.iconRef, 'me-1')
    this.renderer.addClass(this.iconRef, 'fa-solid')
    this.renderer.addClass(this.iconRef, 'fa-triangle-exclamation')

    // Append children
    this.renderer.appendChild(this.spanRef, this.iconRef)
    this.renderer.appendChild(this.spanRef , this.spanText)
    this.renderer.appendChild(this.el.nativeElement, this.spanRef)
  }

  updateDirective(previous: TicketPriority, current: TicketPriority) {
    // Remove previous
    this.removeColorClass(previous)
    this.renderer.removeChild(this.spanRef , this.spanText)

    // Update current
    this.addColorClass(current)
    this.spanText = this.renderer.createText(this.priorityPipe.transform(current))
    this.renderer.appendChild(this.spanRef , this.spanText)
  }

}
