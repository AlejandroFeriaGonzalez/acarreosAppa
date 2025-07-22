import { Routes } from '@angular/router';
import { Admin } from './admin';
import { BisonComponent } from './bison/bison';
import { CaretakerComponent } from './caretaker/caretaker';
import { OrderManagement } from './order-management/order-management';
import { Dashboard } from './dashboard/dashboard';
import { AddBisonComponent } from './add-bison/add-bison';
import { AddCaretakerComponent } from './add-caretaker/add-caretaker';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'bison', component: BisonComponent },
      { path: 'add-bison', component: AddBisonComponent },
      { path: 'caretaker', component: CaretakerComponent },
      { path: 'add-caretaker', component: AddCaretakerComponent },
      { path: 'order-management', component: OrderManagement },
    ],
  },
  { path: '**', redirectTo: '' },
];
