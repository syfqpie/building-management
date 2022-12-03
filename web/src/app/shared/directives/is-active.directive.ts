import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges } from '@angular/core';

import { IsActivePipe } from '../handlers/pipes/is-active.pipe';
import { BadgeDirective } from './base/badge.directive';

@Directive({
  selector: '[badgeIsActive]'
})
export class IsActiveDirective extends BadgeDirective {

  @Input()
  badgeIsActive: boolean = false

  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private activityPipe: IsActivePipe
  ) {
    super(el, renderer)
    this.setBaseClass()
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['badgeIsActive'].currentValue !== null &&
      (changes['badgeIsActive'].previousValue === null ||
      changes['badgeIsActive'].previousValue === undefined)
    ) {
      this.initDirective(Boolean(changes['badgeIsActive'].currentValue))
    } else if (
      changes['badgeIsActive'].currentValue !== null &&
      changes['badgeIsActive'].previousValue !== null &&
      changes['badgeIsActive'].currentValue !== undefined
    ) {
      this.updateDirective(
        Boolean(changes['badgeIsActive'].previousValue),
        Boolean(changes['badgeIsActive'].currentValue)
      )
    }
  }

  override getThemeName(active: boolean) {
    if (active === true) return 'success'
    else return 'danger'
  }

  override getThemeIcon(active: boolean) {
    if (active === true) return 'fa-circle-check'
    else return 'fa-circle-xmark'
  }

  initDirective(current: boolean) {
    this.addColorClass(current)

    // Create span related text and elements
    this.spanRef = this.renderer.createElement('span')
    this.spanText = this.renderer.createText(this.activityPipe.transform(current))

    // Create icon related element and class
    this.iconRef = this.renderer.createElement('i')
    this.renderer.addClass(this.iconRef, 'me-1')
    this.renderer.addClass(this.iconRef, 'fa-regular')
    this.renderer.addClass(this.iconRef, this.getThemeIcon(current))

    // Append children
    this.renderer.appendChild(this.spanRef, this.iconRef)
    this.renderer.appendChild(this.spanRef , this.spanText)
    this.renderer.appendChild(this.el.nativeElement, this.spanRef)
  }

  updateDirective(previous: boolean, current: boolean) {
    // Remove previous
    this.removeColorClass(previous)
    this.renderer.removeChild(this.spanRef , this.spanText)
    this.renderer.removeClass(this.iconRef, this.getThemeIcon(previous))

    // Update current
    this.addColorClass(current)
    this.spanText = this.renderer.createText(this.activityPipe.transform(current))
    this.renderer.appendChild(this.spanRef , this.spanText)
    this.renderer.addClass(this.iconRef, this.getThemeIcon(current))
  }

}
