import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IAddAuthor } from '../model/IAddAuthor';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  addAuthor(author: IAddAuthor) {
    const httpOptions = {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
      };
    return this.http.post(this.baseUrl + '/author/add', author, httpOptions);
  }

  editAuthor(author: IAddAuthor) {
    const httpOptions = {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
      };
    return this.http.put(`${this.baseUrl + '/author/editAuthor' }`, author, httpOptions);
  }

  getAuthorList(): Observable<IAddAuthor[]> {
    const httpOptions = {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
      };
    return this.http.get<IAddAuthor[]>(this.baseUrl + '/author/list', httpOptions);
  }

  deleteAuthor(authorId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
      })
      };
    return this.http.delete(`${this.baseUrl  + '/author/deletAuthor' }/${authorId}`, httpOptions);
  }

}
