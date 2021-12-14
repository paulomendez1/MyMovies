import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utilities';
import { ActorDTO, ActorMovieDTO } from './actor.model';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + '/actors'

  getAll(page: number, recordsPerPage: number, sortColumn: string, sortOrder: string): Observable<any>{
    let params = new HttpParams()
          .set('page', page.toString())
          .set('recordsPerPage', recordsPerPage.toString())
          .set("sortColumn", sortColumn)
          .set("sortOrder", sortOrder);
    return this.http.get<ActorDTO[]>(this.apiURL, {observe: 'response', params});
  }
  
  getById(id: number): Observable<ActorDTO>{
    return this.http.get<ActorDTO>(`${this.apiURL}/${id}`);
  }

  post(actor: ActorDTO){
    const formData = this.buildFormData(actor);
    return this.http.post(this.apiURL, formData);
  }
  put(id: number, actor: ActorDTO){
    const formData = this.buildFormData(actor);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }
  delete(id:number){
    return this.http.delete(`${this.apiURL}/${id}`)
  }
  searchByName(name: string): Observable<ActorMovieDTO[]>{
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post<ActorMovieDTO[]>(`${this.apiURL}/searchByName`,
    JSON.stringify(name), {headers});
  }
  private buildFormData(actor: ActorDTO) : FormData {
    const formData = new FormData();
    
    formData.append('name', actor.name);

    if(actor.biography){
      formData.append('biography', actor.biography);
    }

    if(actor.birthdate){
      formData.append('birthdate', formatDateFormData(actor.birthdate));
    }

    if(actor.picture){
      formData.append('picture', actor.picture);
    }

    return formData;
  }
}
