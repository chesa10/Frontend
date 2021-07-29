
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from 'src/app/model/Book';
import { AlertifyService } from 'src/app/services/alertify.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  editBookForm: FormGroup;
  book: IBook;
  bookSubmitted: boolean;
  authorBookId: number;
  constructor(private fb: FormBuilder,
              private bookService: BookService,
              private alertify: AlertifyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.authorBookId = +this.route.snapshot.params['id'];
    this.createaddBookForm();
  }

    createaddBookForm() {
      this.bookService.getAuthorBook(this.authorBookId).subscribe(
        data => {
            this.book = data;
            this.editBookForm =  this.fb.group({
              id: [this.book.id, Validators.required],
              isbn: [this.book.isbn, Validators.required],
              bookTitle: [this.book.bookTitle, [Validators.required]],
              totalPages: [this.book.totalPages, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
              description: [this.book.description, [Validators.required, Validators.maxLength(200)]]
            });
        });
     }

  onSubmit() {
      console.log(this.editBookForm.value);
      this.bookSubmitted = true;

      if (this.editBookForm.valid) {
        this.bookService.editBook(this.bookData()).subscribe(() =>
        {
            this.onReset();
            this.alertify.success('You are successfully edited a book');
        });
      }
  }

  onReset() {
      this.bookSubmitted = false;
  }


  bookData(): IBook {
      return this.book = {
          id: this.book.id,
          isbn: this.isbn.value,
          bookTitle: this.bookTitle.value,
          totalPages: this.totalPages.value,
          description: this.description.value
      };
  }

  // ------------------------------------
  // Getter methods for all form controls
  // ------------------------------------
  get id() {
    return this.editBookForm.get('id') as FormControl;
  }
  get isbn() {
      return this.editBookForm.get('isbn') as FormControl;
  }
  // get authorId() {
  //   return this.editBookForm.get('authorId') as FormControl;
  // }

  get bookTitle() {
      return this.editBookForm.get('bookTitle') as FormControl;
  }
  get totalPages() {
      return this.editBookForm.get('totalPages') as FormControl;
  }
  get description() {
      return this.editBookForm.get('description') as FormControl;
  }

}
