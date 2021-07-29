import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAddAuthor } from 'src/app/model/IAddAuthor';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  addAuthorForm: FormGroup;
  author: IAddAuthor;
  authorSubmitted: boolean;
  constructor(private fb: FormBuilder,
              private authorService: AuthorService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.createAuthorForm();
  }

  createAuthorForm() {
    this.addAuthorForm =  this.fb.group({
      firstName: [null, Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      lastName: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    });
  }

  onSubmit() {
    this.authorSubmitted = true;
    if (this.addAuthorForm.valid) {
        this.authorService.addAuthor(this.authorData()).subscribe(() =>
        {
            this.onReset();
            this.alertify.success('Congrats, you are successfully add an author');
        });
    }
  }

  authorData(): IAddAuthor {
    return this.author = {
        lastName: this.lastName.value,
        firstName: this.firstName.value
    };
  }

  onReset() {
      this.authorSubmitted = false;
      this.addAuthorForm.reset();
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

}
