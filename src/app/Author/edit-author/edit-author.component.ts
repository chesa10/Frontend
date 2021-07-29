import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAddAuthor } from 'src/app/model/IAddAuthor';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {

  addAuthorForm: FormGroup;
  author: IAddAuthor;
  authorSubmitted: boolean;
  constructor(private fb: FormBuilder,
              private authorService: AuthorService,
              private alertify: AlertifyService) { }

  @Input() authorInput: IAddAuthor;

  ngOnInit() {
    this.createAuthorForm();
  }

  createAuthorForm() {
    this.addAuthorForm =  this.fb.group({
      firstName: [this.authorInput.firstName, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: [this.authorInput.lastName, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      authorId: [this.authorInput.authorId, [Validators.required]]
    });
  }

  onSubmit() {
    this.authorSubmitted = true;
    if (this.addAuthorForm.valid) {
        this.authorService.editAuthor(this.authorData()).subscribe(() =>
        {
            this.onReset();
            this.alertify.success('You are successfully edited an author');
        });
    }
  }

  authorData(): IAddAuthor {
    return this.author = {
        authorId: +this.authorId.value,
        lastName: this.lastName.value,
        firstName: this.firstName.value
    };
  }

  onReset() {
      this.authorSubmitted = false;
  }

      // ------------------------------------
    // Getter methods for all form controls
    // ------------------------------------
  get firstName() {
      return this.addAuthorForm.get('firstName') as FormControl;
  }

  get lastName() {
      return this.addAuthorForm.get('lastName') as FormControl;
  }

  get authorId() {
    return this.addAuthorForm.get('authorId') as FormControl;
}

}
