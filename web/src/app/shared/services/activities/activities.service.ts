import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UnitActivity } from '../activities/activities.model';

const BASE_URL = `${ environment.baseUrl }v1/unit-activities/`

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  // Data
  public activity: UnitActivity | undefined
  public activities: UnitActivity[] = []

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<UnitActivity[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<UnitActivity[]>(urlTemp).pipe(
      tap((res: UnitActivity[]) => {
        this.activities = res
        // console.log('Unit activities:', this.activities)
      })
    )
  }

  getOne(id: number): Observable<UnitActivity> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<UnitActivity>(urlTemp).pipe(
      tap((res: UnitActivity) => {
        this.activity = res
        // console.log('Unit activitiy:', this.activity)
      })
    )
  }

}
