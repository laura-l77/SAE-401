import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  // 1. Configuration du graphique Radar (Capacité d'Absorption)
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public radarChartLabels: string[] = ['Prix', 'Diversité', 'Apparence', 'Durabilité', 'Qualité', 'Canal de vente'];

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      { data: [65, 59, 90, 81, 56, 55], label: 'Secteur Social' },
      { data: [28, 48, 40, 19, 96, 27], label: 'Secteur Privé' }
    ]
  };
  public radarChartType: ChartType = 'radar';

  // Nous ajouterons les données des 3 autres graphiques juste après
}