import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from '../main.service';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Contact } from '../objects/contact';
import { FormGroup, FormControl } from '@angular/forms';
import { Category } from '../objects/category';
import { NgxSpinnerService } from 'ngx-spinner';


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
    private mainService: MainService, private http: HttpClient, private spinner: NgxSpinnerService) {
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
    this.mainService.getContacts()
      .subscribe(
        //success
        result => { result.map(r => this.contacts.push(r)); },
        //errors
        err => { },
        //complete
        () => { })
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
    this.spinner.show();
    this.categories = [];
    this.mainService.getCategories()
      .subscribe(result => {
        result
          .map(c => this.categories.push(c))
      }, err => {}, () => {this.spinner.hide()});
  }


  addContact() {

    let contact: Contact = {
      name: this.contactForm.value.name,
      surname: this.contactForm.value.surname,
      number: this.contactForm.value.number,
      address: this.contactForm.value.address,
      category: this.contactForm.value.category,
      ranking: this.contactForm.value.ranking,
      tags: this.prepareTags(this.contactForm.value.tags)
    }

    this.mainService.postContact(contact)
      .subscribe(
        data => { },

        (err: HttpErrorResponse) => { console.log(err) },

        () => {
          this.addTags(contact.number, contact.tags)
        })
  }

  prepareTags(tagString: string) {
    return tagString.split(",")
  }

  addTags(phone: string, tags: string[]) {
    this.mainService.postTags(phone, tags)
      .subscribe(
        data => { },
        (err: HttpErrorResponse) => { console.log(err) },
        () => {
          this.contactForm.reset();
          this.trigger();
          this.getContacts();
        });
  }

  flag: boolean;
  updateContactAddress(phone: string, address: string) {
    this.mainService.putContactAddress(phone, address)
      .subscribe(s => { }, e => { }, () => { this.getContacts(); this.trigger() })
  }

  trigger() {
    if (this.flag) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  }

  delete(phone: string) {   
    this.mainService.deleteContact(phone).subscribe(s => { }, e => { }, () => { this.getContacts() })
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
