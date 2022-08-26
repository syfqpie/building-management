import { Pipe, PipeTransform } from '@angular/core';
import { VehicleType } from '../../services/vehicles/vehicles.model';

@Pipe({
  name: 'vehicleType'
})
export class VehicleTypePipe implements PipeTransform {

  transform(value: VehicleType | undefined, ...args: unknown[]): string {
    if (value) {
      return value === VehicleType.CAR ? 'Car' :
        value === VehicleType.MOTOR ? 'Motorcycle' :
        value === VehicleType.LORRY ? 'Lorry' :
        'N/A'
    } else {
      return 'N/A'
    }
  }

}
