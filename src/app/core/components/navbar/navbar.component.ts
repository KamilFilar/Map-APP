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
  
  public faMapLocationDot: IconDefinition = faMapLocationDot;
  public faHamburger: IconDefinition = faHamburger;
  public isModalDisplayed: boolean = false;
  public isRealTimeOn: boolean = true;
  public isDrawPolygonSelected: boolean = false;
  public btnArr: ButtonStruct[] = [
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

  public setRealTimeModel(): void {
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

  public toggleModal(): boolean {
    return (this.isModalDisplayed = !this.isModalDisplayed);
  }

  public shouldDraw(): boolean {
    return (this.isDrawPolygonSelected = !this.isDrawPolygonSelected);
  }

  public startDrawingPolygon(): void {
    this.isDrawPolygonSelected = true;
    // close modal when opened
    if (this.isModalDisplayed === true) {
      this.toggleModal();
    }
    this.mapService.drawPolygon();
  }

  public toggleNavItems(): void {
    const items: HTMLElement = document.querySelector('.navbar__items')!;
    items?.classList.toggle('showItems');
  }
}
