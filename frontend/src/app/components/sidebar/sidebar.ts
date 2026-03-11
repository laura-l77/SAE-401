import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important pour les boucles @for

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  regions = [
    'Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Bretagne',
    'Centre-Val de Loire', 'Grand Est', 'Hauts-de-France',
    'Ile de France', 'Normandie', 'Nouvelle- Aquitaine',
    'Occitanie', 'Pays de la Loire', 'Provence-Alpes-Côte d’Azur', 'Corse'
  ];
  
  regionSelectionnee = 'Auvergne-Rhône-Alpes';

  selectRegion(region: string) {
    this.regionSelectionnee = region;
  }
}