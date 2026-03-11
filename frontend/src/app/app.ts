import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// On importe les noms exacts des classes que tu as définies
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { Dashboard } from './components/dashboard/dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    Header,     // Nom exact de la classe
    Sidebar,    // Nom exact de la classe
    Dashboard   // Nom exact de la classe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'frontend';
}