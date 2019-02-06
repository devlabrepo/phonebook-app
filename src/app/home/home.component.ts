import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  counter: number;

  text = {
    line1: "",
    line2: ""
  };

  constructor(private mainService: MainService) { }

  ngOnInit() {
    //  this.mainService.getCounter().subscribe(d => { this.counter = d });
  }

  show(event) {
    console.log(this.text);
    console.log(event);
  }

}
