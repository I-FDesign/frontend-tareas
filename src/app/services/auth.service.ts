import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../config';
import { User } from '../models/user.model';

import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  token: string;

  constructor(
    private http: HttpClient
  ) {

    this.getUserData();
   }

   getUserData() {
    const storage = this.getStorage();

    if (storage.user && storage.token) {
      this.user = storage.user;
      this.token = storage.token;
    }
   }

  signUp(user: any) {
    const url = BACKEND_URL + 'api/signup';

    return this.http.post(url, user);
  }

  login(user: any) {
    const url = BACKEND_URL + 'api/login';

    return this.http.post(url, user);
  }

  saveInStorage(user, token, tokenExpiresIn) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiresIn', tokenExpiresIn);
  }

  getStorage() {
    const storage: any = {};

    storage.user = JSON.parse(localStorage.getItem('user'));
    storage.token = localStorage.getItem('token');
    storage.tokenExpiresIn = localStorage.getItem('tokenExpiresIn');

    return storage;

  }

  logOut(tokenExpired = false) {
    this.user = null;
    this.token = null;

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiresIn');

    if (!tokenExpired) {
      swal({
        title: 'Cerraste sesíon',
        text: 'Has cerrado sesión correctamente!',
        icon: 'success',
        timer: 1500
      });
    } else {
      swal({
        title: 'Token invalido',
        text: 'Su sesión ha expirado, inicie sesión nuevamente!',
        icon: 'error',
        timer: 1500
      });
    }
  }

  refreshToken() {
    let url = BACKEND_URL + 'api/refresh';
    url += '?token=' + this.token;

    this.http.post(url, {}).subscribe((res: any) => {
      this.saveInStorage(res.user, res.access_token, res.expires_in);
      this.token = res.access_token;
      this.user = res.user;
    });
  }
}
