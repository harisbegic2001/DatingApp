import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
registerMode = false;


  constructor() { }

  ngOnInit(): void {
    
  console.log(this.registerMode);
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
    console.log(this.registerMode);
    
  }
  


  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
  
}
