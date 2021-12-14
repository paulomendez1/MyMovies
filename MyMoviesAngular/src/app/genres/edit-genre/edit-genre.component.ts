import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { GenreDTO } from '../genre.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute, 
              private router : Router,
              private formBuilder : FormBuilder,
              private genresService : GenresService) { }


  form!: FormGroup;

  genre!: GenreDTO;

  id?: number;

  title!: string;
  

  ngOnInit(): void {
    this.loadData()
    this.form = this.formBuilder.group({
      name: ['', 
      [
      Validators.required, 
      Validators.minLength(3)
    ]]
    });
  }

  loadData(){
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.genresService.getById(this.id).subscribe(result => {
        this.genre = result;
        this.title = this.genre.name;
        this.form.patchValue(this.genre);
      }, error => console.error(error));
    }
  }

  onSubmit(){
    var genre = (this.id) ? this.genre : <GenreDTO>{};
    genre.name = this.form.get("name")!.value;
    if (this.id) {
      this.genresService.put(this.id, genre).subscribe(() =>{
        this.router.navigate(['/genres']);
      }, error => console.error(error))
    }
    else{
      this.genresService.post(genre).subscribe(() => {
        this.router.navigate(['/genres'])
      }, error => console.error(error))
    }  
  }

  getErrorMsgFieldName(){
    const field = this.form.get('name');

    if(field?.hasError('minlength')){;
      return 'The minimun length is 3';
    }
    if(field?.hasError('required')){
      return 'The name field is required';
    }
    return '';
  }
}
