import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  status = ['Stable', 'Critical', 'Finished'];

  ngOnInit() {
    this.projectForm = new FormGroup({
        'name': new FormControl(null, [Validators.required], this.prohibitedNames),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'status': new FormControl(null)
    });
  }

  prohibitedNames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({'ProjectNameIsProhibited': true});
        } else {
          resolve(null);
        }
      }, 1000)
    });
    return promise;
  }

  submit(){
    console.log(this.projectForm.value);
    this.projectForm.reset();
  }
}
