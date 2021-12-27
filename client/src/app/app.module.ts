import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'; //Ovo moramo importovati da bi mogli u imports pozivati
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RegComponent } from './reg/reg.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //Gore ga importovali da možemo raditi
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
