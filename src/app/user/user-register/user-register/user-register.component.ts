import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { UserForRegister } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private alertifyService: AlertifyService) { }

  registerationForm: FormGroup;
  user: UserForRegister;
  userSubmitted: boolean;

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registerationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(10)]]
    }, {Validators: this.passwordMatchingValidation});
  }

  // Getter methods for all form controls
  get userName() {
    return this.registerationForm.get('userName') as FormControl;
  }

  get email() {
    return this.registerationForm.get('email') as FormControl;
  }

  get password() {
    return this.registerationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registerationForm.get('confirmPassword') as FormControl;
  }

  get mobile() {
    return this.registerationForm.get('mobile') as FormControl;
  }

  // Custom Validators
  passwordMatchingValidation(fg: FormGroup): Validators {
      return fg.get('password').value === fg.get('confirmPassword').value ? null : {notmatched: true};
  }

  onSubmit() {
    console.log(this.registerationForm.value);
    this.userSubmitted = true;

    if (this.registerationForm.valid) {
      this.authService.registerUser(this.userData()).subscribe(() => {
        this.onReset();
        this.alertifyService.success('Congrats, your are now registered');
      });
    }
  }

  userData(): UserForRegister {
    return this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    };
  }

  onReset() {
    this.userSubmitted = false;
    this.registerationForm.reset();
}

}
