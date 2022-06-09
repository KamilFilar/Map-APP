import { Component } from '@angular/core';
import { faHamburger, faMapLocationDot, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ButtonStruct } from 'src/app/shared/interfaces/button-struct';
import { MapService } from '../../../shared/services/map.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  
  faMapLocationDot: IconDefinition = faMapLocationDot;
  faHamburger: IconDefinition = faHamburger;
  isModalDisplayed: boolean = false;
  isRealTimeOn: boolean = true;
  isDrawPolygonSelected: boolean = false;
  btnArr: ButtonStruct[] = [
    {
      name: 'Real-Time Model',
      type: 'main',
      method: () => this.setRealTimeModel(),
    },
    {
      name: 'Change coords',
      type: 'standard',
      method: () => this.toggleModal(),
    },
    {
      name: 'Polygon creator',
      type: 'standard',
      method: () => this.startDrawingPolygon(),
    },
  ];

  constructor(
    private mapService: MapService
  ) {}

  setRealTimeModel(): void {
    this.isRealTimeOn = !this.isRealTimeOn;
    // close modal when opened
    if (this.isModalDisplayed === true) {
      this.toggleModal();
    }
    // block drawing polygons
    if (this.isDrawPolygonSelected === true) {
      this.shouldDraw();
    }
  }

  toggleModal(): boolean {
    return (this.isModalDisplayed = !this.isModalDisplayed);
  }

  shouldDraw(): boolean {
    return (this.isDrawPolygonSelected = !this.isDrawPolygonSelected);
  }

  startDrawingPolygon(): void {
    this.isDrawPolygonSelected = true;
    // close modal when opened
    if (this.isModalDisplayed === true) {
      this.toggleModal();
    }
    this.mapService.drawPolygon();
  }

  toggleNavItems(): void {
    const items: HTMLElement = document.querySelector('.navbar__items')!;
    items?.classList.toggle('showItems');
  }
}
