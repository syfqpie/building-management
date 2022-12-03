import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges } from '@angular/core';

import { TicketPriority } from '../services/ticket/ticket.model';
import { TicketPriorityPipe } from '../handlers/pipes/ticket-priority.pipe';

@Directive({
  selector: '[tixPriority]'
})
export class TicketPriorityDirective implements OnChanges {

  @Input()
  tixPriority: TicketPriority | undefined

  spanRef: ElementRef | undefined
  spanText: ElementRef | undefined
  iconRef: ElementRef | undefined

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private priorityPipe: TicketPriorityPipe
  ) {
    this.setBaseClass()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['tixPriority'].currentValue !== null &&
      (changes['tixPriority'].previousValue === null ||
      changes['tixPriority'].previousValue === undefined)
    ) {
      this.initDirective(Number(changes['tixPriority'].currentValue))
    } else if (
      changes['tixPriority'].currentValue !== null &&
      changes['tixPriority'].previousValue !== null &&
      changes['tixPriority'].currentValue !== undefined
    ) {
      this.updateDirective(
        Number(changes['tixPriority'].previousValue),
        Number(changes['tixPriority'].currentValue)
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

  getThemeName(stat: TicketPriority) {
    if (stat === TicketPriority.CRIT) return 'danger'
    else if (stat === TicketPriority.HIGH) return 'warning'
    else if (stat === TicketPriority.NORMAL) return 'primary'
    else if (stat === TicketPriority.LOW) return 'info'
    else if (stat === TicketPriority.VLOW) return 'secondary'
    else return 'primary'
  }

  addColorClass(stat: TicketPriority) {
    const theme = this.getThemeName(stat)
    this.renderer.addClass(this.el.nativeElement, `bg-${ theme }`)
    this.renderer.addClass(this.el.nativeElement, `text-${ theme }`)
  }

  removeColorClass(stat: TicketPriority) {
    const theme = this.getThemeName(stat)
    this.renderer.removeClass(this.el.nativeElement, `bg-${ theme }`)
    this.renderer.removeClass(this.el.nativeElement, `text-${ theme }`)
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
