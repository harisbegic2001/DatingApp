import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {
model: any = {}
loggedIn!: boolean

constructor(private accountService: AccountService) { }

  ngOnInit(): void { 
  }

  register(){
    this.accountService.register(this.model).subscribe(response => {
      console.log("Uspješna registracija");
    }, error =>{
      console.log(error);
      
    });
  }

}
