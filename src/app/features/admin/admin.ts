import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import {
  LucideAngularModule,
  Wind,
  LayoutDashboard,
  Users,
  Package,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  User,
} from 'lucide-angular';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './admin.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Admin {
  private router = inject(Router);

  readonly Wind = Wind;
  readonly LayoutDashboard = LayoutDashboard;
  readonly Users = Users;
  readonly Package = Package;
  readonly Settings = Settings;
  readonly LogOut = LogOut;
  readonly Menu = Menu;
  readonly Bell = Bell;
  readonly Search = Search;
  readonly User = User;

  readonly navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: this.LayoutDashboard },
    { name: 'Gestión de Bisontes', href: '/admin/bison', icon: this.Wind },
    { name: 'Cuidadores', href: '/admin/caretaker', icon: this.Users },
    { name: 'Órdenes', href: '/admin/order-management', icon: this.Package },
  ];

  goToHome() {
    this.router.navigate(['/home']);
  }

}
