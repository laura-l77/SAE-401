import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html', // Vérifie que c'est bien './home.html'
  styleUrl: './home.css'      // Vérifie que c'est bien './home.css'
})
export class HomeComponent {} // <-- Le mot "export" est obligatoire !