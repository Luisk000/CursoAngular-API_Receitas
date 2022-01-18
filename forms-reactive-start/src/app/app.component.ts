import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female', 'other'];
  signUpForm: FormGroup;
  prohibitedUsernames = ['John', 'john'];

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.prohibitedNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.prohibitedEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([new FormControl(null)])
    });
    this.signUpForm.valueChanges.subscribe(
      (value) => console.log(value)
    );
    this.signUpForm.valueChanges.subscribe( //ou patchValue para apenas um ou mais campos específicos
      (status) => console.log(status)
    );
    /* this.signUpForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'max@max.com'
      },
      'gender': 'male',
      'hobbies': []
    }) */
  }

  onSubmit(){
    console.log(this.signUpForm);
    this.signUpForm.reset();
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  prohibitedNames(control: FormControl): {[s: string]: boolean} {
    if (this.prohibitedUsernames.indexOf(control.value) !== -1){
      return {'nameIsProhibited': true}
    }
    return null; //é necessário para ser válido
  }

  prohibitedEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsProhibited': true});
        } else {
          resolve(null);
        }
      }/* , 1000 */)
    });
    return promise;
  }
}
