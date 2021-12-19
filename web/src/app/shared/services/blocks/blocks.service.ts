import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Block } from './blocks.model';

const baseUrl = `${ environment.baseUrl }v1/users/`

@Injectable({
  providedIn: 'root'
})
export class BlocksService {

  // Data
  block: Block
  blocks: Block[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Block> {
    return this.http.post<any>(baseUrl, body).pipe(
      tap((res) => {
        this.block = res
        // console.log('Block: ', this.block)
      })
    )
  }

  getAll(): Observable<Block[]> {
    return this.http.get<Block[]>(baseUrl).pipe(
      tap((res) => {
        this.blocks = res
        // console.log('Blocks: ', this.blocks)
      })
    )
  }

  getOne(id: number): Observable<Block> {
    return this.http.get<Block>(`${ baseUrl }${ id }/`).pipe(
      tap((res) => {
        this.block = res
        // console.log('Block: ', this.block)
      })
    )
  }

  patch(id: number, body: any): Observable<Block> {
    return this.http.patch<Block>(`${ baseUrl }${ id }/`, body).pipe(
      tap((res) => {
        this.block = res
        // console.log('Block: ', this.block)
      })
    )
  }

  activate(id: number): Observable<Block> {
    return this.http.get<Block>(`${ baseUrl }${ id }/activate/`).pipe(
      tap((res) => {
        this.block = res
        // console.log('Block: ', this.block)
      })
    )
  }

  deactivate(id: number): Observable<Block> {
    return this.http.get<Block>(`${ baseUrl }${ id }/deactivate/`).pipe(
      tap((res) => {
        this.block = res
        // console.log('Block: ', this.block)
      })
    )
  }

}
