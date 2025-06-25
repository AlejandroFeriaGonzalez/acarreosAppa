import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { Quote } from './features/quote/quote';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login},
  { path: 'register', component: Register},
  { path: 'quote', component: Quote},
  { path: '**', redirectTo: 'home' },
];
