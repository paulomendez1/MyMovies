import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2'
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatMenuModule} from '@angular/material/menu';
import {DragDropModule} from '@angular/cdk/drag-drop'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown'
import { LeafletModule } from '@asymmetrik/ngx-leaflet'

import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';
import { RatingComponent } from './utilities/rating/rating.component';
import { HomeComponent } from './home/home.component';
import { IndexGenresComponent } from './genres/index-genres/index-genres.component';
import { EditGenreComponent } from './genres/edit-genre/edit-genre.component';
import { IndexActorsComponent } from './actors/index-actors/index-actors.component';
import { EditActorComponent } from './actors/edit-actor/edit-actor.component';
import { IndexMovieTheatresComponent } from './movie-theaters/index-movie-theaters/index-movie-theatres.component';
import { EditMovieTheatreComponent } from './movie-theaters/edit-movie-theater/edit-movie-theatre.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { MovieFilterComponent } from './movies/movie-filter/movie-filter.component';
import { LoadImgComponent } from './utilities/load-img/load-img.component';
import { InputMarkdownComponent } from './utilities/input-markdown/input-markdown.component';
import { MapComponent } from './utilities/map/map.component';
import { MultipleSelectorComponent } from './utilities/multiple-selector/multiple-selector.component';
import { ActorsAutocompleteComponent } from './actors/actors-autocomplete/actors-autocomplete.component';
import { FormActorComponent } from './actors/form-actor/form-actor.component';
import { MovieTheaterFormComponent } from './movie-theaters/movie-theater-form/movie-theater-form.component';
import { FormMovieComponent } from './movies/form-movie/form-movie.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { AuthorizeViewComponent } from './security/authorize-view/authorize-view.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { FormAuthenticationComponent } from './security/form-authentication/form-authentication.component';
import { DisplayErrorsComponent } from './utilities/display-errors/display-errors.component'
import { JwtInterceptorService } from './security/jwt-interceptor.service';
import { ForgotpwComponent } from './security/forgotpw/forgotpw.component';
import { ResetpwComponent } from './security/resetpw/resetpw.component';
import { SideNavComponent } from './menu/side-nav/side-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    GenericListComponent,
    MenuComponent,
    RatingComponent,
    HomeComponent,
    IndexGenresComponent,
    EditGenreComponent,
    IndexActorsComponent,
    EditActorComponent,
    IndexMovieTheatresComponent,
    EditMovieTheatreComponent,
    EditMovieComponent,
    MovieFilterComponent,
    LoadImgComponent,
    InputMarkdownComponent,
    MapComponent,
    MultipleSelectorComponent,
    ActorsAutocompleteComponent,
    FormActorComponent,
    MovieTheaterFormComponent,
    FormMovieComponent,
    MovieDetailsComponent,
    AuthorizeViewComponent,
    LoginComponent,
    RegisterComponent,
    FormAuthenticationComponent,
    DisplayErrorsComponent,
    ForgotpwComponent,
    ResetpwComponent,
    SideNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MarkdownModule.forRoot(),
    LeafletModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    FlexLayoutModule,
    MatMenuModule,
    DragDropModule
  ],
  providers: [
    LoadImgComponent,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
