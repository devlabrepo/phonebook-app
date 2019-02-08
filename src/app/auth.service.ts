import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Subject, Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  private isLogged = new Subject<boolean>();


  constructor(private angularFire: AngularFireAuth, private router: Router) {

    angularFire.authState.subscribe(user => {
      this.user = user;
    })

  
  }

  login(email: string, password: string) {
    console.log(email, password);
    this.angularFire.auth.signInWithEmailAndPassword(email, password)
    .then( user => {
      if(user) {
        this.isLogged.next(true);
        this.router.navigateByUrl("/contacts");
      }
    })
    .catch(error => { console.log(error) });
  }

  logout() {
    this.angularFire.auth.signOut()
    .then( status => {
      this.isLogged.next(false);
      this.router.navigateByUrl("/home")
    }).catch( error => {
      this.isLogged.next(false); 
      console.warn(error)});
      this.router.navigateByUrl("/home") ;
  }

  signup(login: string, password: string) {
    this.angularFire.auth.createUserWithEmailAndPassword(login, password)
      .then(v => { }).catch(e => { });
  }

  getLoginStatus(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

}
