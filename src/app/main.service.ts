import { Injectable } from '@angular/core';
import { Subject, Observable, config } from 'rxjs';
import { Contact } from './objects/contact';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from './objects/category';

const server = environment.config;

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private counter: number = 0;
  private sum = new Subject<number>();

  constructor(private http: HttpClient) { }


  // ----------------------- CRUD ---------------------------------
  getContacts(): Observable<Array<Contact>> {
    return this.http.get<Array<Contact>>(server.host + "/contacts");
  }

  getCategories() {
    return this.http.get<Array<Category>>(server.host + "/categories")
  }

  postContact(contact: Contact) {
    return this.http.post(server.host + "/contacts", contact);
  }

  postTags(phone: string, tags: string[]) {
    let param = new HttpParams().set("phone", phone);
    return this.http.post(server.host + "/tags", tags, { params: param })
  }

  putContactAddress(phone: string, address: string) {
    let param = new HttpParams().set("phone", phone).set("city", address)
    return this.http.put(server.host + "/contacts", {}, { params: param })
    //to co zostanie wygenerowane: 
    //http://89.67.215.18:11780/phonebook/api/dto/contacts?phone=123456&city=xyzv
  }

  deleteContact(phone: string) {
    let param = new HttpParams().set("phone", phone);
    return this.http.delete(server.host + "/contacts", { params: param });
  }

  // ----------------------- END CRUD ---------------------------------



  getContactsResponse(): Observable<HttpResponse<Response>> {
    return this.http.get<Response>(server.host + "/contacts", { observe: 'response' });
  }
  
  incrementCounter(): void {
    this.counter++;
    this.sum.next(this.counter);
  }

  getCounter(): Observable<number> {
    return this.sum.asObservable();
  }

}
