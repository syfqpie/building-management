import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UnitNumber } from './unit-numbers.model';

@Injectable({
  providedIn: 'root'
})
export class UnitNumbersService {

  // Data
  public unit: UnitNumber
  public units: UnitNumber[] = []

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<UnitNumber[]> {
    const urlTemp = `${ environment.baseUrl }v1/unit-numbers/`
    return this.http.get<UnitNumber[]>(urlTemp).pipe(
      tap((res: UnitNumber[]) => {
        this.units = res
        // console.log('Unit numbers:', this.units)
      })
    )
  }

  getOne(id: string | undefined): Observable<UnitNumber> {
    const urlTemp = `${ environment.baseUrl }v1/unit-numbers/${ id }/`
    return this.http.get<UnitNumber>(urlTemp).pipe(
      tap((res: UnitNumber) => {
        this.unit = res
        // console.log('Unit number:', this.unit)
      })
    )
  }

}
