import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionService } from '../../services/region.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  // Liste complète incluant les 13 régions métropolitaines + les 5 DROM
  regions = [
    { name: 'Auvergne-Rhône-Alpes' },
    { name: 'Bourgogne-Franche-Comté' },
    { name: 'Bretagne' },
    { name: 'Centre-Val de Loire' },
    { name: 'Corse' },
    { name: 'Grand Est' },
    { name: 'Hauts-de-France' },
    { name: 'Île-de-France' },
    { name: 'Normandie' },
    { name: 'Nouvelle-Aquitaine' },
    { name: 'Occitanie' },
    { name: 'Pays de la Loire' },
    { name: 'Provence-Alpes-Côte d\'Azur' },
    // Ajout des régions d'outre-mer
    { name: 'Guadeloupe' },
    { name: 'Guyane' },
    { name: 'La Réunion' },
    { name: 'Martinique' },
    { name: 'Mayotte' }
  ];

  selectedRegion: string = 'France Entière';

  constructor(private regionService: RegionService) {}

  ngOnInit() {
    this.regionService.currentRegion.subscribe(name => {
      this.selectedRegion = name;
    });
  }

  onSelectRegion(name: string) {
    this.regionService.changeRegion(name);
  }
}