import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges } from '@angular/core';

import { TicketStatus } from '../services/ticket/ticket.model';
import { TicketStatusPipe } from '../handlers/pipes/ticket-status.pipe';

@Directive({
  selector: '[tixStatus]'
})
export class TicketStatusDirective implements OnChanges {

  @Input()
  tixStatus: TicketStatus | undefined

  spanRef: ElementRef | undefined
  spanText: ElementRef | undefined
  iconRef: ElementRef | undefined

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private statusPipe: TicketStatusPipe
  ) {
    this.el.nativeElement.className = 'mb-0 small d-inline-flex \
      px-2 py-1 bg-opacity-10 border border-opacity-10 rounded-2'
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['tixStatus'].previousValue === null &&
      changes['tixStatus'].currentValue !== null
    ) {
      this.initDirective(Number(changes['tixStatus'].currentValue))
    } else if (
      changes['tixStatus'].previousValue !== null &&
      changes['tixStatus'].currentValue !== null
    ) {
      this.updateDirective(
        Number(changes['tixStatus'].previousValue),
        Number(changes['tixStatus'].currentValue)
      )
    }
  }

  getThemeName(stat: TicketStatus) {
    if (stat === TicketStatus.OPENED) return 'primary'
    else if (stat === TicketStatus.IN_PROGRESS) return 'warning'
    else if (stat === TicketStatus.RESOLVED) return 'success'
    else if (stat === TicketStatus.CLOSED) return 'danger'
    else if (stat === TicketStatus.DUPLICATED) return 'info'
    else return 'primary'
  }

  getThemeIcon(stat: TicketStatus) {
    if (stat === TicketStatus.OPENED) return 'fa-circle-exclamation'
    else if (stat === TicketStatus.IN_PROGRESS) return 'fa-circle-exclamation'
    else if (stat === TicketStatus.RESOLVED) return 'fa-circle-check'
    else if (stat === TicketStatus.CLOSED) return 'fa-circle-xmark'
    else if (stat === TicketStatus.DUPLICATED) return 'fa-triangle-exclamation'
    else return 'fa-circle-exclamation'
  }

  addColorClass(stat: TicketStatus) {
    const theme = this.getThemeName(stat)
    this.renderer.addClass(this.el.nativeElement, `bg-${ theme }`)
    this.renderer.addClass(this.el.nativeElement, `text-${ theme }`)
  }

  removeColorClass(stat: TicketStatus) {
    const theme = this.getThemeName(stat)
    this.renderer.removeClass(this.el.nativeElement, `bg-${ theme }`)
    this.renderer.removeClass(this.el.nativeElement, `text-${ theme }`)
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
