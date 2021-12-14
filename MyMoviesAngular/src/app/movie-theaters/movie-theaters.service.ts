import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieTheaterDTO } from './movie-theater.model';

@Injectable({
  providedIn: 'root'
})
export class MovieTheatersService {

  constructor(private http : HttpClient) { }

  private apiURL = environment.apiURL + '/movietheaters'

  getAll(): Observable<MovieTheaterDTO[]>{
    return this.http.get<MovieTheaterDTO[]>(this.apiURL);
  }
  
  getById(id: number): Observable<MovieTheaterDTO>{
    return this.http.get<MovieTheaterDTO>(`${this.apiURL}/${id}`);
  }

  post(movieTheater: MovieTheaterDTO){
    return this.http.post(this.apiURL, movieTheater);
  }
  put(id: number, movieTheater: MovieTheaterDTO){
    return this.http.put(`${this.apiURL}/${id}`, movieTheater);
  }
  delete(id:number){
    return this.http.delete(`${this.apiURL}/${id}`)
  }

}
