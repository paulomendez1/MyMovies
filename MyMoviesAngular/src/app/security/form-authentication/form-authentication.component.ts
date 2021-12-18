import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userCredentials } from '../security.model';

@Component({
  selector: 'app-form-authentication',
  templateUrl: './form-authentication.component.html',
  styleUrls: ['./form-authentication.component.css']
})
export class FormAuthenticationComponent implements OnInit {

  constructor(private formBuilder : FormBuilder) { }

  form!: FormGroup

  @Input()
  action: string = 'Register'

  @Output()
  onSubmit = new EventEmitter<userCredentials>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      password: ['', {
        validators: [Validators.required]
      }]
    })
  }
    getEmailErrorMsg(){
      var field = this.form.get('email')
      if (field?.hasError('required')){
        return "The email field is required";
      }
      if (field?.hasError('email')){
        return "The email format is invalid";
      }
      return ''
    }
  }


