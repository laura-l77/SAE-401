import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatistiqueService {
  private baseUrl = 'http://localhost:8000/statistique';

  constructor(private http: HttpClient) {}

  //appelle l'API 1
  getLogements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/logement`);
  }

  //appelle l'API 2
  getStatsParDepartement(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/departement`);
  }

  //appelle l'API 3
  getStatsParRegion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/region`);
  }
}