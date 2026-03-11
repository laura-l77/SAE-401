import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { Dashboard } from './components/dashboard/dashboard'; // On enlève le .ts ici !

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: Dashboard },
  { path: '**', redirectTo: '' }
];