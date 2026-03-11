import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // <-- INDISPENSABLE

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink], // <-- AJOUTÉ ICI
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {}