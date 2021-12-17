import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent:string, serverDescription:string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent:string, serverDescription:string}>();
  //newServerName = '';
  newServerContent = '';
  //newServerDescription = '';
  @ViewChild('serverDescriptionInput', {static: true}) serverDescriptionInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onAddServer(nameInput) {
    this.serverCreated.emit({serverName: nameInput.value, serverContent: this.newServerContent, serverDescription: this.serverDescriptionInput.nativeElement.value});
  }

  onAddBlueprint(nameInput) {
    this.blueprintCreated.emit({serverName: nameInput.value, serverContent: this.newServerContent, serverDescription: this.serverDescriptionInput.nativeElement.value});
  }
}
