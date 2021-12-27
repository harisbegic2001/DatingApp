import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {} //Object
  loggedIn!: boolean;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }
  login(){                                //Značenje subscribe-a
    this.accountService.login(this.model).subscribe(response => {
      console.log("Uspješan login");
      this.loggedIn = true;
    }, error => {
      console.log(error);
      
    });
  }

 /* register(){
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      
    });
  } */ 

  logout(){
    this.loggedIn = false;
  }
}
