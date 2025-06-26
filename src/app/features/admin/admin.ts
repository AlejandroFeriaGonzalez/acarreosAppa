import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LucideAngularModule, Wind, LayoutDashboard, Users, Package, Settings, LogOut, Menu, Bell, Search, User } from 'lucide-angular';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink, LucideAngularModule],
  templateUrl: './admin.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Admin {
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
    { name: "Dashboard", href: "/admin/dashboard", icon: this.LayoutDashboard },
    { name: "Bison Management", href: "/admin/bison", icon: this.Wind },
    { name: "Caretakers", href: "/admin/caretaker", icon: this.Users },
    { name: "Orders", href: "/admin/order-management", icon: this.Package },
  ];
}
