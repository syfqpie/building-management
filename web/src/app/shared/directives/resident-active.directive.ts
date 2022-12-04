import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges } from '@angular/core';

import { IsActivePipe } from '../handlers/pipes/is-active.pipe';
import { BadgeDirective } from './base/badge.directive';

@Directive({
  selector: '[badgeResidentActive]'
})
export class ResidentActiveDirective extends BadgeDirective {

  @Input()
  badgeResidentActive: boolean = false

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
      changes['badgeResidentActive'].currentValue !== null &&
      (changes['badgeResidentActive'].previousValue === null ||
      changes['badgeResidentActive'].previousValue === undefined)
    ) {
      this.initDirective(Boolean(changes['badgeResidentActive'].currentValue))
    } else if (
      changes['badgeResidentActive'].currentValue !== null &&
      changes['badgeResidentActive'].previousValue !== null &&
      changes['badgeResidentActive'].currentValue !== undefined
    ) {
      this.updateDirective(
        Boolean(changes['badgeResidentActive'].previousValue),
        Boolean(changes['badgeResidentActive'].currentValue)
      )
    }
  }

  override getThemeName(active: boolean) {
    return active ? 'success' : 'danger'
  }

  override getThemeIcon(active: boolean) {
    return active ? 'fa-user-astronaut' : 'fa-user-xmark'
  }

  initDirective(current: boolean) {
    this.addColorClass(current)

    // Create span related text and elements
    this.spanRef = this.renderer.createElement('span')
    this.spanText = this.renderer.createText(this.activityPipe.transform(current))

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
