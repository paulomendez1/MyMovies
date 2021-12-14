import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utilities';
import { homeDTO, movieCreationDTO, movieDTO, moviePostGetDTO, moviePutGetDTO } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + '/movies'

  public PostGet() : Observable<moviePostGetDTO>{
    return this.http.get<moviePostGetDTO>(`${this.apiURL}/PostGetMovies`);
    }

  public PutGet(id: number) : Observable<moviePutGetDTO>{
    return this.http.get<moviePutGetDTO>(`${this.apiURL}/putget/${id}`)
  }

  public put(id:number, movie: movieCreationDTO){
    const formData = this.BuildFormData(movie)
    return this.http.put(`${this.apiURL}/${id}`, formData)
  }

  public filter(values: any): Observable<any>{
    const params = new HttpParams({fromObject: values});
    return this.http.get<movieDTO[]>(`${this.apiURL}/filter`, {params, observe: 'response'});
  }

  public post(movie: movieCreationDTO) : Observable<number>{
    const formData = this.BuildFormData(movie);
    console.log(JSON.stringify( formData.get('genresIds') ))
    return this.http.post<number>(this.apiURL, formData)
  }

  public delete(id : number){
    return this.http.delete(`${this.apiURL}/${id}`)
  }

  public getById(id: number) : Observable<movieDTO>{
    return this.http.get<movieDTO>(`${this.apiURL}/${id}`)
  }

  public getHomePageMovies() : Observable<homeDTO>{
    return this.http.get<homeDTO>(this.apiURL)
  }

  private BuildFormData(movie: movieCreationDTO){
    const formData = new FormData();

    formData.append('title', movie.title);
    formData.append('summary', movie.summary);
    formData.append('trailer', movie.trailer);
    formData.append('inTheaters', String(movie.inTheaters));
    if(movie.releaseDate){
      formData.append('releaseDate', formatDateFormData(movie.releaseDate));
    }
    if(movie.poster){
      formData.append('poster', movie.poster);
    }

    formData.append('genresIds', JSON.stringify(movie.genresIds));
    formData.append('movieTheatersIds', JSON.stringify(movie.movieTheatersIds));
    formData.append('actors', JSON.stringify(movie.actors));


    return formData;
  }
}
