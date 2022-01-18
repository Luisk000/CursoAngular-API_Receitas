import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signUpForm: NgForm;
  defaultQuestion = 'pet';
  answer='';
  genders = ['male', 'female', 'other']
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  suggestUserName() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var wordLenght = Math.floor(Math.random() * (Math.floor(20) - Math.ceil(5))) + Math.ceil(5);
    var charactersLength = characters.length;
    for ( var i = 0; i < wordLenght ; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
    var suggestedName = result;
    /* this.signUpForm.setValue({
      userData: {
        username: suggestedName,
        email: '',
      },
        secret: 'pet',
        questionAnswer: '',
        gender: 'male'
    }); */
    this.signUpForm.form.patchValue({
      userData:{
        username: suggestedName
      }
    });
  }

  /* onSubmit(form: NgForm){
    console.log(form);
  } */

  onSubmit() {
    this.submitted = true;
    this.user.username = this.signUpForm.value.userData.username;
    this.user.email = this.signUpForm.value.userData.email;
    this.user.secretQuestion = this.signUpForm.value.secret;
    this.user.answer = this.signUpForm.value.questionAnswer;
    this.user.gender = this.signUpForm.value.gender;

    this.signUpForm.reset();
  }
}
