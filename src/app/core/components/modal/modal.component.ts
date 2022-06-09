import { Component } from '@angular/core';
import { MapService } from '../../../shared/services/map.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  
  coordinatesForm: FormGroup = new FormGroup({
    longitude: new FormControl('', [
      Validators.required
    ]),
    latitude: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private mapService: MapService
  ) {}

  get longitude() {
    return this.coordinatesForm.get('longitude');
  }

  get latitude() {
    return this.coordinatesForm.get('latitude');
  }

  goToNewCoordinates(): void {
    this.mapService.changeCoordinates(
      this.coordinatesForm.value.longitude,
      this.coordinatesForm.value.latitude
    );
  }
}
