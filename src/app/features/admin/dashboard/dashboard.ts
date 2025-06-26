import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Wind,
  Users,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  // Icons for template
  Wind = Wind;
  Users = Users;
  Package = Package;
  TrendingUp = TrendingUp;
  AlertTriangle = AlertTriangle;
  CheckCircle = CheckCircle;
  Clock = Clock;
  DollarSign = DollarSign;

  stats = signal({
    totalBison: 6,
    availableBison: 4,
    activeCaregivers: 8,
    pendingOrders: 12,
    activeOrders: 8,
    completedToday: 5,
    revenue: 15420,
    alerts: 3,
  });

  recentOrders = [
    {
      id: 'AP-123456',
      customer: 'Toph Beifong',
      from: 'Ba Sing Se',
      to: 'Republic City',
      status: 'in_transit',
      bison: 'Appa Jr.',
      value: 450,
    },
    {
      id: 'AP-123457',
      customer: 'Katara',
      from: 'Southern Water Tribe',
      to: 'Northern Air Temple',
      status: 'pending',
      bison: 'Unassigned',
      value: 320,
    },
    {
      id: 'AP-123458',
      customer: 'Zuko',
      from: 'Fire Nation Capital',
      to: 'Ba Sing Se',
      status: 'completed',
      bison: 'Thunder',
      value: 680,
    },
  ];

  alerts = [
    { type: 'warning', message: 'Thunder requires maintenance check', time: '2 hours ago' },
    { type: 'info', message: 'New caretaker application received', time: '4 hours ago' },
    { type: 'urgent', message: 'Weather alert: Storm approaching Fire Nation', time: '6 hours ago' },
  ];
}
