import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1); /*Značenje ovoog?? */
  currentUser$ = this.currentUserSource.asObservable(); /* Ovo nam je observable ali koja je njegova f-on */
  
  constructor(private http: HttpClient) { }


  login(model: any){ /*Zašto ovdje u post nismo direktno kucali čitav naš https nego smo ga komadali*/ /* Ovo sam odgovorio */
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
    map((response: User)  => { /*ovdje nam je response parametar ali koje podatke prima response, koje će vrijednosti biti response*/
      const user = response;
      if(user){
        localStorage.setItem('user', JSON.stringify(user)); /*Kako funkcioniše ovo preko key word 'user' --> šta nam to znači  */
        /*Je li nam ovdje bio potreban stringify jer su nam već atributi bili stringovi */
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
    this.currentUserSource.next(null as any);
  }

  register(model: any)
  {                                                          /*Šta nam ovo treba značiti ovaj model*/ /*Object koji stavljamo kao parametar*/ 
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }
}
