import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import { RegionService } from '../../services/region.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  selectedRegion: string = 'France Entière';

  constructor(private regionService: RegionService) {}

  ngOnInit() {
    // On écoute le service : dès qu'une région est cliquée, on met à jour
    this.regionService.currentRegion.subscribe(name => {
      this.selectedRegion = name;
      this.updateChartsData(); 
    });
  }

  updateChartsData() {
    // On simule un changement de données pour montrer que ça réagit
    // On crée une nouvelle référence d'objet pour forcer le rafraîchissement du graphique
    this.barChartData = {
      ...this.barChartData,
      datasets: [{
        ...this.barChartData.datasets[0],
        data: [Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100]
      }]
    };
  }

  // CONFIGURATIONS DES GRAPHIQUES
  public radarChartType: ChartType = 'radar';
  public chartOptions: ChartConfiguration['options'] = { responsive: true, maintainAspectRatio: false };
  public barChartOptions: ChartConfiguration['options'] = { indexAxis: 'y', responsive: true, maintainAspectRatio: false };

  public mixedChartData: any = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [
      { type: 'bar', label: 'Demandes', data: [65, 59, 80, 81, 56, 55], backgroundColor: '#3b82f6' },
      { type: 'line', label: 'Objectif', data: [40, 48, 40, 19, 86, 27], borderColor: '#ef4444' }
    ]
  };

  public barChartData: ChartData<'bar'> = {
    labels: ['Studio', 'T2', 'T3', 'T4', 'T5+'],
    datasets: [{ data: [45, 67, 80, 40, 20], label: 'Logements', backgroundColor: '#10b981' }]
  };

  public lineChartData: ChartData<'line'> = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [{ data: [12, 19, 3, 5, 2, 3], label: 'Attributions', borderColor: '#8b5cf6' }]
  };

  public radarChartData: ChartData<'radar'> = {
    labels: ['Prix', 'Diversité', 'Apparence', 'Durabilité', 'Qualité', 'Canal'],
    datasets: [
      { data: [65, 59, 90, 81, 56, 55], label: 'Social', borderColor: '#f59e0b' },
      { data: [28, 48, 40, 19, 96, 27], label: 'Privé', borderColor: '#64748b' }
    ]
  };
}