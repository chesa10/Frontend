import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBook } from '../model/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  addBook(book: IBook) {
    const httpOptions = {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
      };
    return this.http.post(this.baseUrl + '/book/add', book, httpOptions);
  }

  // editAuthor(author: IAddAuthor) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //         Authorization: 'Bearer '+ localStorage.getItem('token')
  //     })
  //     };
  //     return this.http.put(`${this.baseUrl + '/author/editAuthor' }`, author, httpOptions);
  // }

  putCustomer(customerData: any) {
    return this.http.put(`${this.baseUrl}`, customerData);
  }

  deleteBook(bookId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
      };
    return this.http.delete(`${this.baseUrl  + '/book/deletBook' }/${bookId}`, httpOptions);
  }

  editBook(book: IBook) {
    const httpOptions = {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
      };
    return this.http.put(`${this.baseUrl + '/book/editBook' }`, book, httpOptions);
  }

  getAllBooks(id?: number): Observable<IBook[]> {
    let authorId = id == null ? '' : id;
    authorId = authorId == NaN ? authorId : '';
    return this.http.get<IBook[]>(this.baseUrl + '/book/list/?authorId=' + authorId.toString());
  }

  getAuthorBook(authorId: number): Observable<IBook> {
    const httpOptions = {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
      };
    return this.http.get<IBook>(this.baseUrl + '/book/getAuthorBook/' + authorId.toString(), httpOptions);
  }
}
