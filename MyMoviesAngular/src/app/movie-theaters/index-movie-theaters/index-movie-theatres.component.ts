import { Component, OnInit } from '@angular/core';
import { MovieTheaterDTO } from '../movie-theater.model';
import { MovieTheatersService } from '../movie-theaters.service';

@Component({
  selector: 'app-index-movie-theatres',
  templateUrl: './index-movie-theatres.component.html',
  styleUrls: ['./index-movie-theatres.component.css']
})
export class IndexMovieTheatresComponent implements OnInit {

  constructor(private movieTheaterService : MovieTheatersService) { }

  movieTheaters!: MovieTheaterDTO[]

  columnsToDisplay = ['name','actions'] ;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.movieTheaterService.getAll().subscribe(movieTheater => this.movieTheaters = movieTheater);
  }
  delete(id: number){
    this.movieTheaterService.delete(id).subscribe(()=>{
      this.loadData();
    })
  }

}
