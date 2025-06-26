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
      to: 'Ciudad República',
      status: 'in_transit',
      bison: 'Appa Jr.',
      value: 450,
    },
    {
      id: 'AP-123457',
      customer: 'Katara',
      from: 'Tribu Agua del Sur',
      to: 'Templo del Aire del Norte',
      status: 'pending',
      bison: 'Sin asignar',
      value: 320,
    },
    {
      id: 'AP-123458',
      customer: 'Zuko',
      from: 'Capital de la Nación del Fuego',
      to: 'Ba Sing Se',
      status: 'completed',
      bison: 'Thunder',
      value: 680,
    },
  ];

  alerts = [
    { type: 'warning', message: 'Thunder requiere revisión de mantenimiento', time: 'hace 2 horas' },
    { type: 'info', message: 'Nueva solicitud de cuidador recibida', time: 'hace 4 horas' },
    { type: 'urgent', message: 'Alerta meteorológica: Tormenta acercándose a la Nación del Fuego', time: 'hace 6 horas' },
  ];

  getStatusTranslation(status: string): string {
    switch (status) {
      case 'completed':
        return 'completado';
      case 'in_transit':
        return 'en tránsito';
      case 'pending':
        return 'pendiente';
      default:
        return status;
    }
  }
}
