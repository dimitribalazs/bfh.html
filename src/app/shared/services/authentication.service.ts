import {Injectable} from '@angular/core';
import {isNullOrUndefined} from "util";

@Injectable()
export class AuthenticationService {
  /**
   * Login user
   *
   * @param {string} username
   */
  login(username: string) {
    if (isNullOrUndefined(username)) throw new Error("username must be defined");
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(username));
  }

  /**
   * Logout user
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
