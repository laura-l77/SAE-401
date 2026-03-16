import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  // 1. On crée une "source" d'information avec une valeur par défaut
  // BehaviorSubject garde toujours la dernière valeur en mémoire
  private regionSource = new BehaviorSubject<string>('France Entière');

  // 2. On crée un "Observable" que les composants (Dashboard) vont écouter
  currentRegion = this.regionSource.asObservable();

  constructor() { }

  // 3. La fonction que la Sidebar appelle pour changer la région
  changeRegion(name: string) {
    this.regionSource.next(name);
  }
}