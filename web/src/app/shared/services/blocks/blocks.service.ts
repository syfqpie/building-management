import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Block } from './blocks.model';

const BASE_URL = `${ environment.baseUrl }v1/blocks/`

@Injectable({
  providedIn: 'root'
})
export class BlocksService {

  // Data
  public block: Block | undefined
  public blocks: Block[] = []

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Block[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<Block[]>(urlTemp).pipe(
      tap((res: Block[]) => {
        this.blocks = res
        console.log('Blocks:', this.blocks)
      })
    )
  }

  getOne(id: string | undefined): Observable<Block> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<Block>(urlTemp).pipe(
      tap((res: Block) => {
        this.block = res
        console.log('Block:', this.block)
      })
    )
  }

}
