import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  constructor() { }

  login(username: string) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(username));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
