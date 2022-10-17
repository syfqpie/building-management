import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UnitActivity } from './activity.model';
import { SingleSeries } from '@swimlane/ngx-charts';

const BASE_URL = `${ environment.baseUrl }v1/unit-activities/`

/**
 * A service for UnitActivity related methods
 */
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  // Data
  public activity: UnitActivity | undefined
  public activities: UnitActivity[] = []
  public overview: SingleSeries[] = []

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Returns a list of activities
   *
   * @returns List of activities
   */
  list(): Observable<UnitActivity[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<UnitActivity[]>(urlTemp).pipe(
      tap((res: UnitActivity[]) => {
        this.activities = res
        // console.log('Unit activities:', this.activities)
      })
    )
  }
  
  /**
   * Returns a activity
   * 
   * @param id - activity ID
   *
   * @returns A activity
   */
  retrieve(id: number): Observable<UnitActivity> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<UnitActivity>(urlTemp).pipe(
      tap((res: UnitActivity) => {
        this.activity = res
        // console.log('Unit activitiy:', this.activity)
      })
    )
  }

  /**
   * Returns an overview of unit activity
   *
   * @returns Overview of unit activity
   */
  getOverview(): Observable<SingleSeries[]> {
    const urlTemp = `${ BASE_URL }overview/`
    return this.http.get<SingleSeries[]>(urlTemp).pipe(
      tap((res: SingleSeries[]) => {
        this.overview = res
        // console.log('Activity overview: ', this.overview)
      })
    )
  }

}
