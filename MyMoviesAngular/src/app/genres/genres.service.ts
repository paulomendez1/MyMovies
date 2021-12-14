import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenreDTO } from './genre.model';
import {environment} from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + '/genres'

  getAll(): Observable<GenreDTO[]>{
    return this.http.get<GenreDTO[]>(this.apiURL);
  }
  
  getById(id: number): Observable<GenreDTO>{
    return this.http.get<GenreDTO>(`${this.apiURL}/${id}`);
  }

  post(genre: GenreDTO){
    return this.http.post(this.apiURL, genre);
  }
  put(id: number, genre: GenreDTO){
    return this.http.put(`${this.apiURL}/${id}`, genre);
  }
  delete(id:number){
    return this.http.delete(`${this.apiURL}/${id}`)
  }


}
