import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toBase64 } from '../utilities';

@Component({
  selector: 'app-load-img',
  templateUrl: './load-img.component.html',
  styleUrls: ['./load-img.component.css']
})
export class LoadImgComponent implements OnInit {

  constructor() { 
    
  }

  imageBase64!: string;

  @Input()
  urlCurrentImage!: File | undefined;

  @Output()
  onImageSelected = new EventEmitter<File>(); 

  ngOnInit(): void {
  }

  change(event ){
    if (event.target.files.length > 0){
      const file: File = event.target.files[0];
      toBase64(file).then((value: string) => this.imageBase64 = value);
      this.onImageSelected.emit(file);
      this.urlCurrentImage = null as any;
    }
}
}

