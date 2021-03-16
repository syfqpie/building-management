import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Block } from './blocks.model';

@Injectable({
  providedIn: 'root'
})
export class BlocksService {

  // URL
  public urlBlocks: string = environment.baseUrl + 'v1/blocks/'

  // Data
  block: Block
  blocks: Block[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<Block> {
    return this.http.post<any>(this.urlBlocks, body).pipe(
      tap((res) => {
        this.block = res
        // console.log('Block: ', this.block)
      })
    )
  }

  getAll(): Observable<Block[]> {
    return this.http.get<Block[]>(this.urlBlocks).pipe(
      tap((res) => {
        this.blocks = res
        // console.log('Blocks: ', this.blocks)
      })
    )
  }

  getOne(id: number): Observable<Block> {
    let urlTemp = this.urlBlocks + id + '/'
    return this.http.get<Block>(urlTemp).pipe(
      tap((res) => {
        this.block = res
        // console.log('Block: ', this.block)
      })
    )
  }

  patch(id: number, body: any): Observable<Block> {
    let urlTemp = this.urlBlocks + id + '/'
    return this.http.patch<Block>(urlTemp, body).pipe(
      tap((res) => {
        this.block = res
        // console.log('Block: ', this.block)
      })
    )
  }

  activate(id: number): Observable<Block> {
    let urlTemp = this.urlBlocks + id + '/activate/'
    return this.http.get<Block>(urlTemp).pipe(
      tap((res) => {
        this.block = res
        // console.log('Block: ', this.block)
      })
    )
  }

  deactivate(id: number): Observable<Block> {
    let urlTemp = this.urlBlocks + id + '/deactivate/'
    return this.http.get<Block>(urlTemp).pipe(
      tap((res) => {
        this.block = res
        // console.log('Block: ', this.block)
      })
    )
  }

}
