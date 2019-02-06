import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from '../main.service';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Contact } from '../objects/contact';
import { FormGroup, FormControl } from '@angular/forms';
import { Category } from '../objects/category';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {

  public contacts = new Array<Contact>();
  public categories = new Array<Category>();

  contactForm: FormGroup;

  constructor(
    private mainService: MainService, private http: HttpClient) {
    this.contactForm = this.createForm();
  }

  ngOnInit(): void {
  //  this.mainService.incrementCounter();
    //  this.getContacts();
    // this.getContactsResponse();
    this.getContactsObs();
    this.getCategories();
  }

  ngOnDestroy(): void {
    console.log("ContactsComponent: onDestroy");
  }


  getContacts() {
    this.contacts = [];
    return this.http.get<Array<Contact>>("http://89.67.215.18:11780/phonebook/api/dto/contacts")
      .subscribe(
        //success
        result => { result.map(r => this.contacts.push(r)); },
        //errors
        err => { },
        //complete
        () => { console.log(this.contacts) })
  }

  getContactsObs() {
    this.contacts = [];
    this.mainService
      .getContacts()
      .subscribe(
        //success
        result => { result.map(r => this.contacts.push(r)); },
        //errors
        err => { },
        //complete
        () => { console.log(this.contacts) })
  }

  getContactsResponse() {
    this.mainService
      .getContactsResponse()
      .subscribe(
        //success
        (response: HttpResponse<Response>) => { console.log(response) },
        //errors
        (err: HttpErrorResponse) => { console.log(err) },
        //complete
        () => { console.log(this.contacts) })
  }


  public getCategories() {
    this.categories = [];
    this.mainService.getCategories()
    .subscribe(result => { result
      .map( c => this.categories.push(c))});
  }


  addContact() {
   
      let contact: Contact = {
        name: this.contactForm.value.name,
        surname: this.contactForm.value.surname,
        number: this.contactForm.value.number,
        address: this.contactForm.value.address,
        category: this.contactForm.value.category,
        ranking: this.contactForm.value.ranking,
        tags: []
      }

     this.mainService
     .addContact(contact)
     .subscribe(
      data => { },
     
      (err: HttpErrorResponse) => { console.log(err) },
     
      () => { 
        this.contactForm.reset();
        this.getContactsObs();
       })
    
  }

  createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
      address: new FormControl(),
      category: new FormControl(),
      number: new FormControl(),
      ranking: new FormControl(),
      tags: new FormControl(),
    })
  }

}
