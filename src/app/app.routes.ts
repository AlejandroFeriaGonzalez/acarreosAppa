import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { Quote } from './features/quote/quote';
import { Order } from './features/order/order';
import { Tracking } from './features/tracking/tracking';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login},
  { path: 'register', component: Register},
  { path: 'quote', component: Quote},
  { path: 'order', component: Order},
  { path: 'tracking', component: Tracking},
  { path: '**', redirectTo: 'home' },
];
