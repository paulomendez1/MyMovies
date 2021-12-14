import { Component, OnInit } from '@angular/core';
import { GenreDTO } from '../genre.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-index-genres',
  templateUrl: './index-genres.component.html',
  styleUrls: ['./index-genres.component.css']
})
export class IndexGenresComponent implements OnInit {

  genres! : GenreDTO[]
  columnsToDisplay = ['name','actions'] ;

  constructor(private genresService: GenresService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.genresService.getAll().subscribe(genres => {
      this.genres = genres; 
    })
  }

  delete(id: number){
    this.genresService.delete(id).subscribe(()=>{
        this.loadData();
    });
  }
}
