import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActorDTO } from '../actor.model';
import { ActorsService } from '../actors.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-index-actors',
  templateUrl: './index-actors.component.html',
  styleUrls: ['./index-actors.component.css']
})
export class IndexActorsComponent implements OnInit {

  constructor(private actorsService : ActorsService) { }

  actors!: ActorDTO[] | null;
  columnsToDisplay = ['name','actions'] ;
  totalAmountOfRecords;
  currentPage = 1;
  pageSize =5;
  defaultSortColumn: string = "name";
  defaultSortOrder: string = "asc";
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  
  ngOnInit(): void {
    this.loadData();
  }


  loadData(){
    var sortColumn = (this.sort)
    ? this.sort.active
    : this.defaultSortColumn;
var sortOrder = (this.sort)
    ? this.sort.direction
    : this.defaultSortOrder;
    this.actorsService.getAll(this.currentPage, this.pageSize, sortColumn, sortOrder).subscribe((response: HttpResponse<ActorDTO[]>) => {
      this.actors = response.body; 
      this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
    });
  }

  delete(id: number){
    this.actorsService.delete(id).subscribe(()=>{
      this.loadData();
  });
  }

  updatePagination(event: PageEvent){
    this.currentPage= event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }
}
