import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Media } from './medias.model';


const baseUrl = `${ environment.baseUrl }v1/medias/`

@Injectable({
  providedIn: 'root'
})
export class MediasService {

  // Data
  media: Media
  medias: Media[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Media> {
    return this.http.post<any>(baseUrl, body).pipe(
      tap((res) => {
        this.media = res
        // console.log('Media: ', this.media)
      })
    )
  }

  getAll(): Observable<Media[]> {
    return this.http.get<Media[]>(baseUrl).pipe(
      tap((res) => {
        this.medias = res
        // console.log('Medias: ', this.medias)
      })
    )
  }

  getOne(id: string): Observable<Media> {
    return this.http.get<Media>(`${ baseUrl }${ id }/`).pipe(
      tap((res) => {
        this.media = res
        // console.log('Media: ', this.media)
      })
    )
  }

}
