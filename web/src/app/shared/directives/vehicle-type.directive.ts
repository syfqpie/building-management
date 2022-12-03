import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges } from '@angular/core';

import { VehicleType } from '../services/vehicle/vehicle.model';
import { VehicleTypePipe } from '../handlers/pipes/vehicle-type.pipe';
import { BadgeDirective } from './base/badge.directive';

@Directive({
  selector: '[badgeVehicleType]'
})
export class VehicleTypeDirective extends BadgeDirective {

  @Input()
  badgeVehicleType: VehicleType | undefined

  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private categoryPipe: VehicleTypePipe
  ) {
    super(el, renderer)
    this.setBaseClass()
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['badgeVehicleType'].currentValue !== null &&
      (changes['badgeVehicleType'].previousValue === null ||
      changes['badgeVehicleType'].previousValue === undefined)
    ) {
      this.initDirective(Number(changes['badgeVehicleType'].currentValue))
    } else if (
      changes['badgeVehicleType'].currentValue !== null &&
      changes['badgeVehicleType'].previousValue !== null &&
      changes['badgeVehicleType'].currentValue !== undefined
    ) {
      this.updateDirective(
        Number(changes['badgeVehicleType'].previousValue),
        Number(changes['badgeVehicleType'].currentValue)
      )
    }
  }

  override getThemeName(vehicleType: VehicleType) {
    if (vehicleType === VehicleType.CAR) return 'primary'
    else if (vehicleType === VehicleType.MOTOR) return 'info'
    else if (vehicleType === VehicleType.LORRY) return 'warning'
    else return 'primary'
  }

  initDirective(current: VehicleType) {
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

  updateDirective(previous: VehicleType, current: VehicleType) {
    // Remove previous
    this.removeColorClass(previous)
    this.renderer.removeChild(this.spanRef , this.spanText)

    // Update current
    this.addColorClass(current)
    this.spanText = this.renderer.createText(this.categoryPipe.transform(current))
    this.renderer.appendChild(this.spanRef , this.spanText)
  }

}
