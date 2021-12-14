import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {

  constructor() { }


  @Output()
  changeMarkdown = new EventEmitter<HTMLInputElement>();
  
  @Input()
  markdownContent: string | undefined;

  @Input()
  label = 'Value';
  

  ngOnInit(): void {
  }

  change(event ){
    this.changeMarkdown.emit(event.target.value)
    }

}
