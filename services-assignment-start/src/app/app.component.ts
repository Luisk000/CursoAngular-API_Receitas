import { Component } from '@angular/core';
import { UserService } from './User.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: {name: string, active: boolean}[] = [];

  constructor(private userService: UserService){}

  change(id: number){
    this.userService.onChange(id);
  }

  ngOnInit(){
    this.users = this.userService.users;
  }
}