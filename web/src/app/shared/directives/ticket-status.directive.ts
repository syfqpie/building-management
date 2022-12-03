import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges } from '@angular/core';

import { BadgeDirective } from './base/badge.directive';
import { TicketStatus } from '../services/ticket/ticket.model';
import { TicketStatusPipe } from '../handlers/pipes/ticket-status.pipe';

@Directive({
  selector: '[badgeTicketStatus]'
})
export class TicketStatusDirective extends BadgeDirective {

  @Input()
  badgeTicketStatus: TicketStatus | undefined

  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private statusPipe: TicketStatusPipe
  ) {
    super(el, renderer)
    this.setBaseClass()
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['badgeTicketStatus'].currentValue !== null &&
      (changes['badgeTicketStatus'].previousValue === null ||
      changes['badgeTicketStatus'].previousValue === undefined)
    ) {
      this.initDirective(Number(changes['badgeTicketStatus'].currentValue))
    } else if (
      changes['badgeTicketStatus'].currentValue !== null &&
      changes['badgeTicketStatus'].previousValue !== null &&
      changes['badgeTicketStatus'].currentValue !== undefined
    ) {
      this.updateDirective(
        Number(changes['badgeTicketStatus'].previousValue),
        Number(changes['badgeTicketStatus'].currentValue)
      )
    }
  }

  override getThemeName(stat: TicketStatus) {
    if (stat === TicketStatus.OPENED) return 'primary'
    else if (stat === TicketStatus.IN_PROGRESS) return 'warning'
    else if (stat === TicketStatus.RESOLVED) return 'success'
    else if (stat === TicketStatus.CLOSED) return 'danger'
    else if (stat === TicketStatus.DUPLICATED) return 'info'
    else return 'primary'
  }

  override getThemeIcon(stat: TicketStatus) {
    if (stat === TicketStatus.OPENED) return 'fa-circle-exclamation'
    else if (stat === TicketStatus.IN_PROGRESS) return 'fa-circle-exclamation'
    else if (stat === TicketStatus.RESOLVED) return 'fa-circle-check'
    else if (stat === TicketStatus.CLOSED) return 'fa-circle-xmark'
    else if (stat === TicketStatus.DUPLICATED) return 'fa-triangle-exclamation'
    else return 'fa-circle-exclamation'
  }

  initDirective(current: TicketStatus) {
    this.addColorClass(current)

    // Create span related text and elements
    this.spanRef = this.renderer.createElement('span')
    this.spanText = this.renderer.createText(this.statusPipe.transform(current))

    // Create icon related element and class
    this.iconRef = this.renderer.createElement('i')
    this.renderer.addClass(this.iconRef, 'me-1')
    this.renderer.addClass(this.iconRef, 'fa-solid')
    this.renderer.addClass(this.iconRef, this.getThemeIcon(current))

    // Append children
    this.renderer.appendChild(this.spanRef, this.iconRef)
    this.renderer.appendChild(this.spanRef , this.spanText)
    this.renderer.appendChild(this.el.nativeElement, this.spanRef)
  }

  updateDirective(previous: TicketStatus, current: TicketStatus) {
    // Remove previous
    this.removeColorClass(previous)
    this.renderer.removeChild(this.spanRef , this.spanText)
    this.renderer.removeClass(this.iconRef, this.getThemeIcon(previous))

    // Update current
    this.addColorClass(current)
    this.spanText = this.renderer.createText(this.statusPipe.transform(current))
    this.renderer.appendChild(this.spanRef , this.spanText)
    this.renderer.addClass(this.iconRef, this.getThemeIcon(current))
  }

}
