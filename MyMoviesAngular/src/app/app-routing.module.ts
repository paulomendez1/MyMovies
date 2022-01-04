import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditActorComponent } from './actors/edit-actor/edit-actor.component';
import { IndexActorsComponent } from './actors/index-actors/index-actors.component';
import { EditGenreComponent } from './genres/edit-genre/edit-genre.component';
import { IndexGenresComponent } from './genres/index-genres/index-genres.component';
import { HomeComponent } from './home/home.component';
import { IsAdminGuard } from './is-admin.guard';
import { EditMovieTheatreComponent } from './movie-theaters/edit-movie-theater/edit-movie-theatre.component';
import { IndexMovieTheatresComponent } from './movie-theaters/index-movie-theaters/index-movie-theatres.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { MovieFilterComponent } from './movies/movie-filter/movie-filter.component';
import { ForgotpwComponent } from './security/forgotpw/forgotpw.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { ResetpwComponent } from './security/resetpw/resetpw.component';

const routes: Routes = [
  {path: '', component: HomeComponent},

  {path: 'genres', component: IndexGenresComponent, canActivate: [IsAdminGuard]},
  {path: 'genres/edit', component: EditGenreComponent, canActivate: [IsAdminGuard]},
  {path: 'genres/edit/:id', component: EditGenreComponent, canActivate: [IsAdminGuard]},

  {path: 'actors', component: IndexActorsComponent, canActivate: [IsAdminGuard] },
  {path: 'actors/edit', component: EditActorComponent, canActivate: [IsAdminGuard]},
  {path: 'actors/edit/:id', component: EditActorComponent, canActivate: [IsAdminGuard]},

  {path: 'movietheaters', component: IndexMovieTheatresComponent, canActivate: [IsAdminGuard] },
  {path: 'movietheaters/edit', component: EditMovieTheatreComponent, canActivate: [IsAdminGuard]},
  {path: 'movietheaters/edit/:id', component: EditMovieTheatreComponent, canActivate: [IsAdminGuard]},

  {path: 'movies/edit', component: EditMovieComponent, canActivate: [IsAdminGuard] },
  {path: 'movies/edit/:id', component: EditMovieComponent, canActivate: [IsAdminGuard] },
  {path: 'movies/filter', component: MovieFilterComponent},
  {path: 'movie/:id', component: MovieDetailsComponent},

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgotpw', component: ForgotpwComponent},
  {path: 'resetpw', component: ResetpwComponent},

  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
