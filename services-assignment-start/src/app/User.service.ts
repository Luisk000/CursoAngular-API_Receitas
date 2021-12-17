import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor() { }
  users = [
  { name:'Max', active: true },
  { name:'Anna', active: true },
  { name:'Chris', active: false },
  { name:'Manu', active: false }
];
  
  onChange(id: number){
    this.users[id].active = !this.users[id].active;
  }
}


