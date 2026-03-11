import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegionService {
  // Par défaut, on affiche la France entière
  private selectedRegionSource = new BehaviorSubject<string>('France Entière');
  currentRegion = this.selectedRegionSource.asObservable();

  changeRegion(regionName: string) {
    this.selectedRegionSource.next(regionName);
  }
}