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
  // 1. Configuration générale des graphiques
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: true, 
        position: 'bottom' 
      }
    }
  };

  // 2. Variable pour le type du graphique Radar (pour corriger l'erreur TS2339)
  public radarChartType: ChartType = 'radar';

  // --- GRAPHIQUE 1 : Mixte (Barres + Ligne) ---
  public mixedChartData: any = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [
      { 
        type: 'bar',
        label: 'Demandes (Barres)', 
        data: [65, 59, 80, 81, 56, 55], 
        backgroundColor: '#3b82f6' 
      },
      { 
        type: 'line',
        label: 'Objectif (Ligne)', 
        data: [40, 48, 40, 19, 86, 27], 
        borderColor: '#ef4444', 
        backgroundColor: 'transparent', 
        fill: false,
        tension: 0.3
      }
    ]
  };

  // --- GRAPHIQUE 2 : Barres Horizontales ---
  public barChartOptions: ChartConfiguration['options'] = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
  };
  public barChartData: ChartData<'bar'> = {
    labels: ['Studio', 'T2', 'T3', 'T4', 'T5+'],
    datasets: [{ 
      data: [45, 67, 80, 40, 20], 
      label: 'Nombre de logements', 
      backgroundColor: '#10b981' 
    }]
  };

  // --- GRAPHIQUE 3 : Courbe d'évolution ---
  public lineChartData: ChartData<'line'> = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [{ 
      data: [12, 19, 3, 5, 2, 3], 
      label: 'Taux d’attribution', 
      borderColor: '#8b5cf6', 
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4 
    }]
  };

  // --- GRAPHIQUE 4 : Radar ---
  public radarChartData: ChartData<'radar'> = {
    labels: ['Prix', 'Diversité', 'Apparence', 'Durabilité', 'Qualité', 'Canal'],
    datasets: [
      { 
        data: [65, 59, 90, 81, 56, 55], 
        label: 'Social', 
        borderColor: '#f59e0b', 
        backgroundColor: 'rgba(245, 158, 11, 0.2)' 
      },
      { 
        data: [28, 48, 40, 19, 96, 27], 
        label: 'Privé', 
        borderColor: '#64748b', 
        backgroundColor: 'rgba(100, 116, 139, 0.2)' 
      }
    ]
  };
}