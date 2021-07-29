import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserForLogin, UserForRegister } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }

baseUrl = environment.baseUrl;

  authUser(user: UserForLogin) {
    return this.http.post(this.baseUrl + '/user/login', user);

  }

  registerUser(user: UserForRegister) {
     return this.http.post(this.baseUrl + '/user/register', user);
  }

}
