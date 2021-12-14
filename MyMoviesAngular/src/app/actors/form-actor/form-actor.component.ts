import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActorDTO } from '../actor.model';

@Component({
  selector: 'app-form-actor',
  templateUrl: './form-actor.component.html',
  styleUrls: ['./form-actor.component.css']
})
export class FormActorComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  @Input()
  model!: ActorDTO;

  form!: FormGroup;

  @Output()
  ononSubmit: EventEmitter<ActorDTO> = new EventEmitter<ActorDTO>();
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required]
      }],
      birthdate: '',
      picture: '',
      biography: ''
    });

    if (this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  onImageSelected(file){
    this.form.get('picture')!.setValue(file);
  }

  changeMarkdown(content){
    this.form.get('biography')!.setValue(content);
  }

  onSubmit(){
    this.ononSubmit.emit(this.form.value);
  }
}
