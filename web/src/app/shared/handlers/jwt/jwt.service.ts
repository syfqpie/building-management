import { Injectable } from '@angular/core';

/**
 * A service for JWT
 */
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  /**
   * Get saved token or information
   * 
   * @param title - title of saved token
   *
   * @returns Saved token
   */
  getToken(title: string): string {
    return window.localStorage[title];
  }

  /**
   * Save a new token or information
   * 
   * @param title - title to be saved
   * @param token - token to be saved
   *
   * @returns Nothing
   */
  saveToken(title: string, token: string) {
    window.localStorage[title] = token;
  }

  /**
   * Destroy all saved token or information
   * in local storage
   *
   * @returns Nothing
   */
  destroyToken() {
    window.localStorage.clear();
  }

}
