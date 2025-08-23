import { Routes } from '@angular/router';
import { Admin } from './admin';
import { Bison } from './bison/bison';
import { Caretaker } from './caretaker/caretaker';
import { OrderManagement } from './order-management/order-management';
import { Dashboard } from './dashboard/dashboard';
import { AddCaretaker } from './add-caretaker/add-caretaker';
import { AddBison } from './add-bison/add-bison';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'bison', component: Bison },
      { path: 'add-bison', component: AddBison },
      { path: 'caretaker', component: Caretaker },
      { path: 'add-caretaker', component: AddCaretaker },
      { path: 'order-management', component: OrderManagement },
    ],
  },
  { path: '**', redirectTo: '' },
];
