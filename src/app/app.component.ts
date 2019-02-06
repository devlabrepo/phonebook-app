import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  
  counter: number;
  title: string = "My Dream App ";
  
  constructor(private mainService: MainService) { }
  
  ngOnInit(): void { this.getCounter() } //rejestracja subskrypcji na zmiennej

  getCounter() {
    this.mainService
    .getCounter()
    .subscribe(data => {this.counter = data}, error => {}, () => {});
  }

}
