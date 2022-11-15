import { Pipe, PipeTransform } from '@angular/core';
import { VehicleType } from '../../services/vehicle/vehicle.model';

/**
 * Transforms an integer to a string representative of VehicleType
 * @see `VehicleType`
 *
 * ### Pre-defined options
 *
 * | Option                | Value            | String representative  |
 * |-----------------------|------------------|------------------------|
 * | VehicleType.CAR       | 1                | Car                    |
 * | VehicleType.MOTOR     | 2                | Motorcycle             |
 * | VehicleType.LORRY     | 3                | Lorry                  |
 * | Else                  | Other than above | N/A                    |
 * 
 */
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
