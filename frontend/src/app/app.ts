import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// On adapte les chemins aux noms de tes fichiers (sans le ".component")
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { Dashboard } from './components/dashboard/dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    SidebarComponent, 
    DashboardComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'frontend';
}