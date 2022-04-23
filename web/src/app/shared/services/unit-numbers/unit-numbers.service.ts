import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UnitNumber } from './unit-numbers.model';

const BASE_URL = `${ environment.baseUrl }v1/unit-numbers/`

@Injectable({
  providedIn: 'root'
})
export class UnitNumbersService {

  // Data
  public unitNumber: UnitNumber
  public unitNumbers: UnitNumber[] = []

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<UnitNumber[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<UnitNumber[]>(urlTemp).pipe(
      tap((res: UnitNumber[]) => {
        this.unitNumbers = res
        console.log('Unit numbers:', this.unitNumbers)
      })
    )
  }

  getOne(id: string | undefined): Observable<UnitNumber> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<UnitNumber>(urlTemp).pipe(
      tap((res: UnitNumber) => {
        this.unitNumber = res
        console.log('UnitNumber:', this.unitNumber)
      })
    )
  }

}
