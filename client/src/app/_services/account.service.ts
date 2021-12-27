import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }


  login(model: any){ /*Zašto ovdje u post nismo direktno kucali čitav naš https nego smo ga komadali*/ 
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
    map((response: User)  => {
      const user = response;
      if(user){
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
      }
    })/*Anything inside here ir RXJS operator*/
    ) 
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next();
  }

  register(model: any)
  {                                                          /*Šta nam ovo treba značiti ovaj model*/
    return this.http.post(this.baseUrl + 'account/register', model)
  }
}
