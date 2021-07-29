
import { Input, TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/model/Book';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/services/alertify.service';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  constructor(private bookService: BookService,
              private alertify: AlertifyService,
              private modalService: BsModalService,
              private router: Router) { }

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  message: string;
  loggedInUser: string;
  @Input() book: IBook = {} as IBook;

  bookId: number;

  ngOnInit() {
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.bookService.deleteBook(this.bookId)
    .subscribe(
      res => {
        this.alertify.error('book deleted');
        this.reloadComponent();
      },
      err => {console.log(err); }
    );
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  openConfirmModal(template: TemplateRef<any>, bookId: number) {
    this.bookId = bookId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  loggedin() {
    this.loggedInUser = localStorage.getItem('userName');
    return this.loggedInUser;
  }

}
