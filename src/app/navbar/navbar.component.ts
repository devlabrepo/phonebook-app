import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isLoggedIn: boolean; //tylko na potrzeby true/false

  constructor(private auth: AuthService) {
    this.auth.getLoginStatus()
      .subscribe((flag: boolean) => { this.isLoggedIn = flag; console.log(this.isLoggedIn) });
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout()
  }

}
