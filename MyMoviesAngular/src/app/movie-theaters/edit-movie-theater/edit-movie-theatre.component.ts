import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { coordinatesMap } from 'src/app/utilities/map/coordinate';
import { MovieTheaterDTO } from '../movie-theater.model';
import { MovieTheatersService } from '../movie-theaters.service';

@Component({
  selector: 'app-edit-movie-theatre',
  templateUrl: './edit-movie-theatre.component.html',
  styleUrls: ['./edit-movie-theatre.component.css']
})
export class EditMovieTheatreComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute, 
              private router : Router,
              private movieTheaterService : MovieTheatersService) { }

  form!: FormGroup;

  model!: MovieTheaterDTO;

  id?: number;

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    if(this.id){
    this.activatedRoute.params.subscribe(params => {
      this.movieTheaterService.getById(params.id).subscribe(movieTheater => this.model = movieTheater);
    },error => console.log(error));      
  }
  }

  onSubmit(movieTheater: MovieTheaterDTO){
    if (this.id) {
      this.movieTheaterService.put(this.id, movieTheater).subscribe(() =>{
        this.router.navigate(['/movietheaters']);
      }, error => console.error(error))
    }
    else{
      this.movieTheaterService.post(movieTheater).subscribe(() => {
        this.router.navigate(['/movietheaters'])
      }, error => console.error(error))
    }  
  }

  onSelectedLocation(event: coordinatesMap){
    this.form.patchValue(event);
  }

}
