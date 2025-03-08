import { Injectable } from '@angular/core';

const TOKEN_KEY = 'PUBLIC-AUTH-TOKEN-CRED';
const USER_KEY = 'PUBLIC-AUTH-USER-CRED';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.localStorage.removeItem('PUBLIC-AUTH-TOKEN-CRED');
    window.localStorage.removeItem('PUBLIC-AUTH-USER-CRED');
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}