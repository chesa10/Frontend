import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IBook } from 'src/app/model/Book';
import { AlertifyService } from 'src/app/services/alertify.service';
import { BookService } from 'src/app/services/book.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  @Input() bookAuthorId: number;
  addBookForm: FormGroup;
  book: IBook;
  bookSubmitted: boolean;
  constructor(private fb: FormBuilder,
              private bookService: BookService,
              private alertify: AlertifyService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.createaddBookForm();
  }

    createaddBookForm() {
      this.addBookForm =  this.fb.group({
        isbn: [null, Validators.required],
        bookTitle: [null, [Validators.required]],
        totalPages: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        description: [null, [Validators.required, Validators.maxLength(200)]],
        authorId: [this.bookAuthorId, [Validators.required]]
      });
  }

  onSubmit() {
      console.log(this.addBookForm.value);
      this.bookSubmitted = true;

      if (this.addBookForm.valid) {
          this.bookService.addBook(this.bookData()).subscribe(() =>
          {
              this.onReset();
              this.alertify.success('Congrats, you are successfully add a book');
          });
      }
  }

  onReset() {
      this.bookSubmitted = false;
      this.addBookForm.reset();
  }


  bookData(): IBook {
      return this.book = {
          isbn: this.isbn.value,
          bookTitle: this.bookTitle.value,
          totalPages: this.totalPages.value,
          authorId: this.bookAuthorId,
          description: this.description.value
      };
  }

  // ------------------------------------
  // Getter methods for all form controls
  // ------------------------------------
  get id() {
    return this.addBookForm.get('id') as FormControl;
  }
  get isbn() {
      return this.addBookForm.get('isbn') as FormControl;
  }
  get authorId() {
    return this.addBookForm.get('authorId') as FormControl;
  }

  get bookTitle() {
      return this.addBookForm.get('bookTitle') as FormControl;
  }
  get totalPages() {
      return this.addBookForm.get('totalPages') as FormControl;
  }
  get description() {
      return this.addBookForm.get('description') as FormControl;
  }

}
