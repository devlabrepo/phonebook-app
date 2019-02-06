import { Injectable } from '@angular/core';
import { Subject, Observable, config } from 'rxjs';
import { Contact } from './objects/contact';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from './objects/category';

const server = environment.config;

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  private counter: number = 0;
  private sum = new Subject<number>();

  incrementCounter(): void {
    this.counter++;
    this.sum.next(this.counter);
  }

  getCounter(): Observable<number> {
    return this.sum.asObservable();
  }

  getContacts(): Observable<Array<Contact>> {
    return this.http.get<Array<Contact>>(server.host + "/contacts");
  }

  getContactsResponse(): Observable<HttpResponse<Response>> {
    return this.http.get<Response>(server.host + "/contacts", { observe: 'response' });
  }

  getCategories() {
    return this.http.get<Array<Category>>(server.host + "/categories")
  }

  addContact(contact: Contact) {
    return this.http.post(server.host + "/contacts", contact);
  }


}
