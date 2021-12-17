import { AccountService } from './../account.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { emit } from 'process';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  /* @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>(); */

  constructor(private accountService: AccountService){
  }

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status);
    /* this.statusChanged.emit({id: this.id, newStatus: status}); */
    this.accountService.statusUpdated.emit(status);
  }
}
