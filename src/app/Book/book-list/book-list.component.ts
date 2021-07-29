import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from 'src/app/model/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  public authorId: number;
  constructor(private router: Router, private bookService: BookService, private route: ActivatedRoute) { }

 // properties: Array<IProperty> = [];
  books: Array<IBook> = [];

  ngOnInit() {
    this.authorId = +this.route.snapshot.params['id'];

    this.bookService.getAllBooks(this.authorId).subscribe(
      data => {
        console.log(data);
        this.books = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
