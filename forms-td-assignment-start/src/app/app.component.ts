import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') signUpForm: NgForm;
  default = 'advanced';
  submitted = false;
  user = {
    email: '',
    type: ''
  };

  submit(){
    this.submitted = true;
    this.user.email = this.signUpForm.value.email;
    this.user.type = this.signUpForm.value.type;
    this.signUpForm.reset();
  }
}
