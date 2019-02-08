import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactsComponent } from './contacts/contacts.component';
import { MainService } from './main.service';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

const config = {
  apiKey: "AIzaSyAVDRplTYtEnbhSic154CezUkIS2pOFXoQ",
  authDomain: "phonebook-1d172.firebaseapp.com",
  databaseURL: "https://phonebook-1d172.firebaseio.com",
  projectId: "phonebook-1d172",
  storageBucket: "phonebook-1d172.appspot.com",
  messagingSenderId: "635811077861"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactsComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,


  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
