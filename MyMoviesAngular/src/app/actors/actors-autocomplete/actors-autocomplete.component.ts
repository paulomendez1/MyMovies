import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { ActorMovieDTO } from '../actor.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-actors-autocomplete',
  templateUrl: './actors-autocomplete.component.html',
  styleUrls: ['./actors-autocomplete.component.css']
})
export class ActorsAutocompleteComponent implements OnInit {

  constructor(private actorsService: ActorsService) { }

   control: FormControl = new FormControl();

   @Input()
   selectedActors: ActorMovieDTO[] = [];

   actorsToDisplay: ActorMovieDTO[] = [];

   columnsToDisplay = ['picture','name','character','actions']

   @ViewChild(MatTable) table! : MatTable<any>;


  ngOnInit(): void {
    this.control.valueChanges.subscribe(value=> {
      this.actorsService.searchByName(value).subscribe(response => {
          this.actorsToDisplay = response;
      });
    })
  }

  optionSelected(event: MatAutocompleteSelectedEvent){
    this.control.patchValue('');   
    if(this.selectedActors.findIndex(x=> x.id == event.option.value.id) !== -1){
      return;
    }
      this.selectedActors.push(event.option.value);
      if (this.table !== undefined){
        this.table.renderRows();
      } 
  }

  remove(actor){
    const index = this.selectedActors.findIndex(a=> a.name === actor.name);
    this.selectedActors.splice(index,1);
    this.table.renderRows();
  }

  dropped(event: CdkDragDrop<any[]>){
    const index = this.selectedActors.findIndex(actor=> actor === event.item.data);
    moveItemInArray(this.selectedActors, index, event.currentIndex);
    this.table.renderRows();
  }
}
