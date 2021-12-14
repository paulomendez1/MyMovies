import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditActorComponent } from './actors/edit-actor/edit-actor.component';
import { IndexActorsComponent } from './actors/index-actors/index-actors.component';
import { EditGenreComponent } from './genres/edit-genre/edit-genre.component';
import { IndexGenresComponent } from './genres/index-genres/index-genres.component';
import { HomeComponent } from './home/home.component';
import { EditMovieTheatreComponent } from './movie-theaters/edit-movie-theater/edit-movie-theatre.component';
import { IndexMovieTheatresComponent } from './movie-theaters/index-movie-theaters/index-movie-theatres.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { MovieFilterComponent } from './movies/movie-filter/movie-filter.component';

const routes: Routes = [
  {path: '', component: HomeComponent},

  {path: 'genres', component: IndexGenresComponent },
  {path: 'genres/edit', component: EditGenreComponent},
  {path: 'genres/edit/:id', component: EditGenreComponent},

  {path: 'actors', component: IndexActorsComponent },
  {path: 'actors/edit', component: EditActorComponent},
  {path: 'actors/edit/:id', component: EditActorComponent},

  {path: 'movietheaters', component: IndexMovieTheatresComponent },
  {path: 'movietheaters/edit', component: EditMovieTheatreComponent},
  {path: 'movietheaters/edit/:id', component: EditMovieTheatreComponent},

  {path: 'movies/edit', component: EditMovieComponent },
  {path: 'movies/edit/:id', component: EditMovieComponent },
  {path: 'movies/filter', component: MovieFilterComponent},
  {path: 'movie/:id', component: MovieDetailsComponent},

  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
