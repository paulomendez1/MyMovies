import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActorMovieDTO } from 'src/app/actors/actor.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { movieCreationDTO, movieDTO } from '../movie.model';


@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.css']
})
export class FormMovieComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form!: FormGroup

  @Input()
  model!: movieDTO

  @Output()
  ononSubmit = new EventEmitter<movieCreationDTO>();

  @Input()
  nonSelectedGenres: multipleSelectorModel[] = [];

  @Input()
  selectedGenres: multipleSelectorModel[] = [];

  @Input()
  nonSelectedMovieTheaters: multipleSelectorModel[] = [];

  @Input()
  selectedMovieTheaters: multipleSelectorModel[] = [];

  @Input()
  selectedActors: ActorMovieDTO[]= [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['',{
        validators: [Validators.required]
      }],
      summary: '',
      inTheaters: false,
      trailer: '',
      releaseDate: '',
      poster: '',
      genresIds: '',
      movieTheatersIds: '',
      actors: ''
    });

    if (this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  onImageSelected(file){
    this.form.get('poster')!.setValue(file);
  }

  changeMarkdown(content){
    this.form.get('summary')!.setValue(content);
  }

  onSubmit(){
    const genresId = this.selectedGenres.map(value=> value.key);
    this.form.get('genresIds')?.setValue(genresId);

    const movieTheaterId = this.selectedMovieTheaters.map(value=> value.key);
    this.form.get('movieTheatersIds')?.setValue(movieTheaterId);
    
    const actors= this.selectedActors.map(val => {
      return {id: val.id, character: val.character}
    });
    this.form.get('actors')?.setValue(actors);

    this.ononSubmit.emit(this.form.value);
  }

}