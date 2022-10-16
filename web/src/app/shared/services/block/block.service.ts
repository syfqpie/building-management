import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Block } from './block.model';

const BASE_URL = `${ environment.baseUrl }v1/blocks/`

/**
 * A service for Block related methods
 */
@Injectable({
  providedIn: 'root'
})
export class BlockService {

  // Data
  public block: Block | undefined
  public blocks: Block[] = []

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Create new block entry
   *
   * @param body - payload
   * @param body.block - block name
   * 
   * @returns New created block entry
   */
  create(body: any): Observable<Block> {
    const urlTemp = `${ BASE_URL }`
    return this.http.post<Block>(urlTemp, body).pipe(
      tap((res: Block) => {
        this.block = res
        // console.log('Block:', this.block)
      })
    )
  }

  /**
   * Returns a list of blocks
   *
   * @returns List of blocks
   */
  list(): Observable<Block[]> {
    const urlTemp = `${ BASE_URL }`
    return this.http.get<Block[]>(urlTemp).pipe(
      tap((res: Block[]) => {
        this.blocks = res
        // console.log('Blocks:', this.blocks)
      })
    )
  }

  /**
   * Returns a block
   * 
   * @param id - block ID
   *
   * @returns A block
   */
  retrieve(id: string | undefined): Observable<Block> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.get<Block>(urlTemp).pipe(
      tap((res: Block) => {
        this.block = res
        // console.log('Block:', this.block)
      })
    )
  }

  /**
   * Partial update a block
   *
   * @param id - block ID
   * @param body - payload
   * @param body.block - block name
   * 
   * @returns Updated block
   */
  patch(id: number, body: any): Observable<Block> {
    const urlTemp = `${ BASE_URL }${ id }/`
    return this.http.patch<Block>(urlTemp, body).pipe(
      tap((res: Block) => {
        this.block = res
        // console.log('Block:', this.block)
      })
    )
  }

}
