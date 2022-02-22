import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

@Output() cancelRegister = new EventEmitter(); /*Ovaj dio koda nam koristi da cancelujemo preko dugmeta šta nam se prikazuje*/ 
  
model: any = {}


constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void { 
  }

  register(){
    this.accountService.register(this.model).subscribe(response => {
      console.log("Uspješna registracija");
      this.cancel();
    }, error =>{
      console.log(error);
      this.toastr.error(error.error)
      
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
    
  }

}
