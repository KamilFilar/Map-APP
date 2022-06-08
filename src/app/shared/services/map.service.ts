import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})

export class MapService {
  map!: L.Map;
  centroid: L.LatLngExpression = [50.0673, 22.5024];

  constructor() {}

  initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 10
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        minZoom: 3,
      }
    );

    tiles.addTo(this.map);
  }

  zoomInMap(): void {
    this.map.zoomIn();
  }

  zoomOutMap(): void {
    this.map.zoomOut();
  }

  changeCoordinates(lat: number, lng: number): void {
    this.map.setView([lat, lng]);
  }


  drawPolygon() {
    let isEndOfShape: boolean = false;
    let latlngsArr: any = [];
    let coordsArr: number[] = [];

    this.map.on('click', <LeafletMouseEvent>(event: any) => {
      // add current point to cordsArray
      coordsArr = [event.latlng.lat, event.latlng.lng];
      // push this to polygon array
      latlngsArr.push(coordsArr);
      // draw polygon
      let last = latlngsArr.slice(-1).pop();
      let first = latlngsArr[0];
      let diff;
      let currentZoomValue = this.map.getZoom();
      
      // calculate current diffe between end and start point
      // yeah I know it's bad idea but it work
      if (currentZoomValue > 14) {
        diff = currentZoomValue / 100000;
      }
      else if (currentZoomValue > 10){
        diff = currentZoomValue / 10000;
      }
      else if (currentZoomValue > 7) {
        diff = currentZoomValue / 1000;
      }
      else if (currentZoomValue > 4) {
        diff = currentZoomValue / 100;
      }
      else {
        diff = currentZoomValue / 10;
      }

      if (
        Math.abs(first[0] - last[0]) <= diff &&
        Math.abs(first[1] - last[1]) <= diff &&
        latlngsArr.length >= 2
      ) {
        isEndOfShape = true;
        latlngsArr.pop(); // remove last point from polygon array
        latlngsArr.push(first); // add (on end) first point from polygon array
        // the shape is finished -> draw a polygon and change the color
        L.polyline(latlngsArr, { color: '#1f4e8d' }).addTo(this.map);
        return;
      } 
      else if (isEndOfShape == false) {
        // draw a circular endpoint of the line
        L.circleMarker([event.latlng.lat, event.latlng.lng], {
          radius: 3,
          color: '#3483eb',
        }).addTo(this.map);

        // draw line
        L.polyline(latlngsArr, { color: '#3483eb' }).addTo(this.map);
      }
    });
  }
}
