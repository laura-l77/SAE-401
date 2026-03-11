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
  // Liste de tes régions
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
    { name: 'Provence-Alpes-Côte d\'Azur' }
  ];

  // Variable pour savoir quelle région est actuellement sélectionnée
  selectedRegion: string = 'France Entière';

  constructor(private regionService: RegionService) {}

  ngOnInit() {
    // On s'abonne au service pour suivre la région active
    // Cela permet de garder le bouton "allumé" en bleu même si le changement vient d'ailleurs
    this.regionService.currentRegion.subscribe(name => {
      this.selectedRegion = name;
    });
  }

  // Fonction appelée par le (click) dans le HTML
  onSelectRegion(name: string) {
    this.regionService.changeRegion(name);
  }
}