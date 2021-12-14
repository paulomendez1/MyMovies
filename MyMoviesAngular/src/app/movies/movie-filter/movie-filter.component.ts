
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenreDTO } from 'src/app/genres/genre.model';
import { GenresService } from 'src/app/genres/genres.service';
import { movieDTO } from '../movie.model';
import { MoviesService } from '../movies.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private moviesService : MoviesService,
              private genresService : GenresService,
              private location : Location) { }

  form!: FormGroup;

  genres!: GenreDTO[];

  movies!: movieDTO[] | null

  currentPage = 1;
  recordsPerPage= 10;
  initialFormValue : any;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      genreId: 0,
      upcomingReleases: false,
      inTheaters: false
    });

    this.initialFormValue = this.form.value;

    this.genresService.getAll().subscribe(genres=>{
      this.genres = genres;

      this.filterMovies(this.form.value)
    
      this.form.valueChanges
      .subscribe(values =>{
        this.filterMovies(values);
      });
    })
  }


  filterMovies(values: any){
    values.page = this.currentPage;
    values.recordsPerPage = this.recordsPerPage;
    this.moviesService.filter(values).subscribe((response: HttpResponse<movieDTO[]>) => {
      this.movies= response.body;
    })
  }

  clearForm(){
    this.form.patchValue(this.initialFormValue);
  }

  onDelete(){
    this.filterMovies(this.form.value);
  }
}
