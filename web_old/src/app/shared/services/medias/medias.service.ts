import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Media } from './medias.model';

@Injectable({
  providedIn: 'root'
})
export class MediasService {

  // URL
  public urlMedias: string = environment.baseUrl + 'v1/medias/'

  // Data
  media: Media
  medias: Media[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Media> {
    return this.http.post<any>(this.urlMedias, body).pipe(
      tap((res) => {
        this.media = res
        // console.log('Media: ', this.media)
      })
    )
  }

  getAll(): Observable<Media[]> {
    return this.http.get<Media[]>(this.urlMedias).pipe(
      tap((res) => {
        this.medias = res
        // console.log('Medias: ', this.medias)
      })
    )
  }

  getOne(id: string): Observable<Media> {
    let urlTemp = this.urlMedias + id + '/'
    return this.http.get<Media>(urlTemp).pipe(
      tap((res) => {
        this.media = res
        // console.log('Media: ', this.media)
      })
    )
  }

}
