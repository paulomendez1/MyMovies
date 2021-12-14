import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorDTO } from '../actor.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute, 
    private router : Router,
    private actorsService : ActorsService) { }

    model!: ActorDTO;

    id!: number;

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    if(this.id){
    this.activatedRoute.params.subscribe(params => {
      this.actorsService.getById(params.id).subscribe(actor => this.model = actor);
    },error => console.log(error));      
  }
  }

  onSubmit(actorCreationDTO: ActorDTO){
    if (this.id){
    this.actorsService.put(this.model.id, actorCreationDTO).subscribe(() => {
      this.router.navigate(['/actors']);
    });
    }
    else{
      this.actorsService.post(actorCreationDTO).subscribe(() => {
        this.router.navigate(['/actors']);
      })
    }
  }


}


