import { Component, OnInit, TemplateRef } from '@angular/core';
import { IAddAuthor } from 'src/app/model/IAddAuthor';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthorService } from 'src/app/services/author.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  message: string;

  constructor(
    private authorService: AuthorService,
    private alertify: AlertifyService,
    private modalService: BsModalService) { }

    authors: IAddAuthor[];
    author: IAddAuthor;
    bookAuthorId: number;
    ActivatedAddEditDepComp = false;

  ngOnInit() {
     this.getAuthorList();
  }

  editClick(author: IAddAuthor) {
    this.author = author;
    this.ActivatedAddEditDepComp = true;
  }

  getAuthorList() {
    this.authorService.getAuthorList().subscribe(
      data => {
          this.authors = data;
      }, error => {
          this.alertify.error(error);
      }
  );
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.authorService.deleteAuthor(this.author.authorId)
    .subscribe(
      res => {
        this.getAuthorList();
        this.alertify.error('Author deleted');
      },
      err => {console.log(err); }
    );
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  openConfirmModal(template: TemplateRef<any>, author: IAddAuthor) {
    this.author = author;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  openEditModal(template: TemplateRef<any>, author: IAddAuthor) {
    this.author = author;
    this.ActivatedAddEditDepComp = true;
    this.modalRef = this.modalService.show(template, this.config);
  }

  openAddBookModal(template: TemplateRef<any>, authorId: number) {
    this.bookAuthorId = authorId;
    this.ActivatedAddEditDepComp = true;
    this.modalRef = this.modalService.show(template, this.config);
  }

  hideModal(): void {
    this.modalRef.hide();
    this.getAuthorList();
  }

}
