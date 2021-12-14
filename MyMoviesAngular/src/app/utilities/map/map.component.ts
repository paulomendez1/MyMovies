import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import { coordinatesMap, coordinatesMapWithMessage  } from './coordinate';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  @Input()
  initialCoordinates: coordinatesMapWithMessage[] = [];

  @Input()
  editMode: boolean = true;
  
  @Output()
  onSelectedLocation= new EventEmitter<coordinatesMap>();

  ngOnInit(): void {
    this.layers = this.initialCoordinates.map((value) => {
      const m = marker([value.latitude, value.longitude]);
      if(value.message){
        m.bindPopup(value.message, {autoClose: false, autoPan: false});
      }
      return m;
    });
  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Angular Movies' })
    ],
    zoom: 13,
    center: latLng(-32.95187818443365, -60.66221237182618)
  };

  layers: Marker<any>[] =[];

  handleMapClick(event: LeafletMouseEvent){
    if(this.editMode){
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;
      const message = "";
      console.log({latitude,longitude});
      this.layers = [];
      this.layers.push(marker([latitude,longitude]));
      this.onSelectedLocation.emit({latitude,longitude})
    }
  }
}
