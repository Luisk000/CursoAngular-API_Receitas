import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input('srvElement') element: {type: string, name: string, content: string, description: string};
  @ViewChild('heading', {static: true}) header: ElementRef;
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;

  constructor() { 
    console.log('constructor started');
  }

  ngOnInit() {
    console.log('OnInit started');
    console.log('Text Content' + this.header.nativeElement.textContent);
    console.log('Paragraph is' + this.paragraph.nativeElement.textContent);
  }

  ngOnChanges(changes:SimpleChanges){
    console.log('OnChanges started');
  }

  ngDoCheck() {    
    console.log('DoCheck started');
  }

  ngAfterContentInit() {  
    console.log('DoCheck started');
  }
  
  ngAfterContentChecked(){
    console.log('AfterContentChecked started');
  }

  ngAfterViewInit() {  
    console.log('AfterViewInit started');
    console.log('Text Content' + this.header.nativeElement.textContent);
  }
  
  ngAfterViewChecked(){
    console.log('AfterViewChecked started');
  }

  ngOnDestroy(){
    console.log('OnDestroy started');
  }
}
