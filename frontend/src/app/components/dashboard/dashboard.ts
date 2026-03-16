//tous les imports 
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import { RegionService } from '../../services/region.service';
import { Sidebar } from '../sidebar/sidebar'; 
import { StatistiqueService } from '../../services/statistique-service'; 

//composant dashboard
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

//classe dashboard
export class Dashboard implements OnInit {
  public selectedRegion: string = 'France Entière';
  private allRegionsData: any[] = []; 

  public equiteSocialData: ChartData<'bar' | 'line'> = { labels: [], datasets: [] };
  public bouclierJeunesseData: ChartData<'bar'> = { labels: [], datasets: [] };
  public doublePeineData: ChartData<'line'> = { labels: [], datasets: [] };
  public tensionMarcheData: ChartData<'radar'> = { labels: [], datasets: [] };

  //config des 4 graphes
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public barChartOptions: ChartConfiguration['options'] = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
  };

  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        suggestedMax: 30,
        ticks: { stepSize: 5 }
      }
    }
  };

  //constructeur pour appeler les services (api)
  constructor(
    private regionService: RegionService,
    private statistiqueService: StatistiqueService,
  ) {}

  //fonction qui s'exécute au lancement du composant
  ngOnInit() {
    //chargement de Symfony (api 3 régions)
    this.statistiqueService.getStatsParRegion().subscribe({
      next: (reponse: any) => {
        this.allRegionsData = reponse;
        this.updateChartsData(); 
      },
      //erreur terminale si l'API ne rep pas
      error: (err: any) => console.error('Erreur API Symfony :', err)
    });

    //appel la sidebar pour voir quel région est choisie
    this.regionService.currentRegion.subscribe((nom) => {
      this.selectedRegion = nom;
      this.updateChartsData(); 
    });
  }

  //fonction pour maj les données des graphes en fonction de la région choisie
  updateChartsData() {
    if (!this.allRegionsData || this.allRegionsData.length === 0) return;

    let deptsAAfficher: any[] = [];

    //si c'est la france entière (page par défaut à l'arriver), on affiche les 10 premiers départements
    if (this.selectedRegion === 'France Entière') {
      deptsAAfficher = this.allRegionsData.flatMap(r => r.departements || []).slice(0, 10);
    //sinon celui de la région choisie
    } else {
      const nomRecherche = this.selectedRegion.toUpperCase();
      const regionTrouvee = this.allRegionsData.find(r => r.nom.toUpperCase() === nomRecherche);
      deptsAAfficher = regionTrouvee ? regionTrouvee.departements : [];
    }

    //mapping des données pour les graphes
    if (deptsAAfficher.length > 0) {
      const labels = deptsAAfficher.map(d => d.nom);
      const stats = deptsAAfficher.map(d => d.statistiqueLogements?.[0] || {});

      //graphe 1
      this.equiteSocialData = {
        labels: labels,
        datasets: [
          { type: 'bar', label: 'Taux pauvreté (%)', data: stats.map(s => s.tauxPauvrete), backgroundColor: '#fbbf24' },
          { type: 'line', label: 'Loyer moyen (en €/m²)', data: stats.map(s => s.loyerMoyen), borderColor: '#3b82f6', tension: 0.4 },
          { type: 'bar', label: 'Taux de logements sociaux (%)', data: stats.map(s => s.tauxLogementsSociaux), backgroundColor: '#10b981' }
        ]
      };

      //graphe 2
      this.bouclierJeunesseData = {
        labels: labels,
        datasets: [
          { label: '% population -20 ans', data: stats.map(s => s.populationMoinsvingt), backgroundColor: '#8b5cf6' },
          { label: 'Taux chômage (%)', data: stats.map(s => s.tauxChomage), backgroundColor: '#ef4444' },
          { label: 'Taux de logements sociaux (%)', data: stats.map(s => s.tauxLogementsSociaux), backgroundColor: '#10b981' }
        ]
      };

      //graphe 3
      this.doublePeineData = {
        labels: labels,
        datasets: [
          { label: 'Âge moyen du parc (années)', data: stats.map(s => s.ageMoyenParc), borderColor: '#6366f1', fill: false },
          { label: '% Logements énergivores', data: stats.map(s => s.logementsEnergivores), borderColor: '#f97316', fill: false },
          { label: 'Loyer moyen (en €/m²)', data: stats.map(s => s.loyerMoyen), borderColor: '#10b981', fill: false }
        ]
      };

      //graphe 4
      const total = deptsAAfficher.length;
      const avgChomage = stats.reduce((acc, s) => acc + (parseFloat(s.tauxChomage) || 0), 0) / total;
      const avgVacants = stats.reduce((acc, s) => acc + (parseFloat(s.tauxLogementsVacants) || 0), 0) / total;
      const avgVariation = stats.reduce((acc, s) => acc + (parseFloat(s.variationPopulation) || 0), 0) / total;

      this.tensionMarcheData = {
        labels: ['Taux chômage', 'Logements vacants', 'Variation Population'],
        datasets: [{
          label: `Marché : ${this.selectedRegion}`,
          data: [avgChomage, avgVacants, avgVariation],
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.4)',
          fill: true
        }]
      };

      //forcer la maj des graphes quand on change de région
      this.equiteSocialData = { ...this.equiteSocialData };
      this.bouclierJeunesseData = { ...this.bouclierJeunesseData };
      this.doublePeineData = { ...this.doublePeineData };
      this.tensionMarcheData = { ...this.tensionMarcheData };
    }
  }
}