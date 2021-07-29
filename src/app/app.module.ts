import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserLoginComponent } from './user/user-login/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register/user-register.component';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HttpErrorInterceptorService } from './services/httperror-interceptor-service';
import { AddAuthorComponent } from './Author/add-author/add-author.component';
import { AuthorService } from './services/author.service';
import { AuthorListComponent } from './Author/author-list/author-list.component';
import { EditAuthorComponent } from './Author/edit-author/edit-author.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddBookComponent } from './Book/add-book/add-book.component';
import { BookService } from './services/book.service';
import { DatePipe } from '@angular/common';
import { BookListComponent } from './Book/book-list/book-list.component';
import { BookCardComponent } from './Book/book-card/book-card.component';
import { BookDetailComponent } from './Book/book-detail/book-detail.component';

const appRoutes: Routes = [
  {path: '', component: BookListComponent},
  {path: 'user/register', component: UserRegisterComponent},
  {path: 'user/login', component: UserLoginComponent},
  {path: 'add-author', component: AddAuthorComponent},
  {path: 'author-list', component: AuthorListComponent},
  {path: 'book-list/:id', component: BookListComponent},
  {path: 'book-detail/:id', component: BookDetailComponent},
  {path: '**', component: BookListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
      NavBarComponent,
      UserLoginComponent,
      UserRegisterComponent,
      AddAuthorComponent,
      AuthorListComponent,
      EditAuthorComponent,
      AddBookComponent,
      BookListComponent,
      BookCardComponent,
      BookDetailComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    DatePipe,
    AlertifyService,
    AuthService,
    AuthorService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
