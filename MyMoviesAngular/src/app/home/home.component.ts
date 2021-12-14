import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private moviesService : MoviesService) { }

  moviesInTheaters;
  moviesFutureReleases;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.moviesService.getHomePageMovies().subscribe((homeDTO) => {
      this.moviesFutureReleases = homeDTO.upcomingReleases;
      this.moviesInTheaters = homeDTO.inTheaters;
    })
  }

  onDelete(){
    this.loadData()
  }
}
