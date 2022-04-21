import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getToken(title: string): string {
    return window.localStorage[title];
  }

  saveToken(title: string, token: string) {
    window.localStorage[title] = token;
  }

  destroyToken() {
    window.localStorage.clear();
  }

}
