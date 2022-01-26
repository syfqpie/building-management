import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Block } from './blocks.model';

@Injectable({
  providedIn: 'root'
})
export class BlocksService {

  // Data
  public block: Block
  public blocks: Block[] = []

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Block[]> {
    const urlTemp = `${ environment.baseUrl }v1/blocks/`
    return this.http.get<Block[]>(urlTemp).pipe(
      tap((res: Block[]) => {
        this.blocks = res
        // console.log('Blocks:', this.blocks)
      })
    )
  }

  getOne(id: string | undefined): Observable<Block> {
    const urlTemp = `${ environment.baseUrl }v1/blocks/${ id }/`
    return this.http.get<Block>(urlTemp).pipe(
      tap((res: Block) => {
        this.block = res
        // console.log('Floor:', this.floor)
      })
    )
  }

}
