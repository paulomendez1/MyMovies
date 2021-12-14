import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorMovieDTO } from 'src/app/actors/actor.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { movieCreationDTO, movieDTO } from '../movie.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, 
              private formBuilder: FormBuilder,
              private router: Router,
              private moviesService : MoviesService) { }

  
  model!: movieDTO;

  id!: number;

  nonSelectedGenres! : multipleSelectorModel[]
  nonSelectedMovieTheaters! : multipleSelectorModel[]
  selectedMovieTheaters!: multipleSelectorModel[]
  selectedGenres!: multipleSelectorModel[]
  selectedActors!: ActorMovieDTO[]


  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    if(this.id){
    this.activatedRoute.params.subscribe(params=>{
      this.moviesService.PutGet(params.id).subscribe(putgetDTO => {
        this.model=putgetDTO.movie;

          this.selectedGenres = putgetDTO.selectedGenres.map(genre => {
            return <multipleSelectorModel> {key: genre.id, value: genre.name}
          });
    
          this.nonSelectedGenres = putgetDTO.nonSelectedGenres.map(genre => {
            return <multipleSelectorModel> {key: genre.id, value: genre.name}
          });

          this.selectedMovieTheaters = putgetDTO.selectedMovieTheaters.map(movieTheater => {
            return <multipleSelectorModel> {key: movieTheater.id, value: movieTheater.name}
          });

          this.nonSelectedMovieTheaters = putgetDTO.nonSelectedMovieTheaters.map(movieTheater => {
            return <multipleSelectorModel> {key: movieTheater.id, value: movieTheater.name}
          });

          this.selectedActors = putgetDTO.actors;
        });
      })
  }
  else{
    this.moviesService.PostGet().subscribe(response => {
      this.nonSelectedGenres = response.genres.map(genre => {
        return <multipleSelectorModel> {key: genre.id, value: genre.name}
      });

      this.nonSelectedMovieTheaters = response.movieTheaters.map(movieTheater => {
        return <multipleSelectorModel> {key: movieTheater.id, value: movieTheater.name} 
      });
    });
  }
  }

  onSubmit(movie: movieCreationDTO) {
    if (this.id){
    this.moviesService.put(this.id, movie).subscribe(() => {
      this.router.navigate(['/movie/' + this.id])
    })
    }
    else{
      this.moviesService.post(movie).subscribe(id => {
        this.router.navigate(['/movie/' + id])
      })
    }
  }

}
  