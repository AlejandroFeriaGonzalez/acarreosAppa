import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { LucideAngularModule, Package, Search, Edit, MapPin, Calendar, DollarSign, User, Wind } from 'lucide-angular';

@Component({
  selector: 'app-order-management',
  imports: [LucideAngularModule, FormsModule, RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './order-management.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderManagement {
  readonly Wind = Wind;
  readonly Package = Package;
  readonly Search = Search;
  readonly Edit = Edit;
  readonly MapPin = MapPin;
  readonly Calendar = Calendar;
  readonly DollarSign = DollarSign;
  readonly User = User;

  searchTerm = signal('');
  statusFilter = signal('all');
  priorityFilter = signal('all');

  ordersData = signal([
    {
      id: 'AP-123456',
      customer: 'Toph Beifong',
      customerEmail: 'toph@reinotierra.com',
      from: 'Ba Sing Se, Reino Tierra',
      to: 'Ciudad República, República Unida',
      status: 'in_transit' as const,
      priority: 'standard' as const,
      bison: 'Appa Jr.',
      caretaker: 'Maestra Jinora',
      orderDate: '2024-01-20',
      estimatedDelivery: '2024-01-22',
      value: 450,
      weight: '2,500 lbs',
      serviceType: 'Mudanza Residencial',
      specialInstructions: 'Pergaminos de tierra control frágiles incluidos',
    },
    {
      id: 'AP-123457',
      customer: 'Katara',
      customerEmail: 'katara@tribuagua.com',
      from: 'Tribu Agua del Sur',
      to: 'Templo del Aire del Norte',
      status: 'pending' as const,
      priority: 'high' as const,
      bison: 'Sin asignar',
      caretaker: 'Sin asignar',
      orderDate: '2024-01-21',
      estimatedDelivery: '2024-01-24',
      value: 320,
      weight: '1,800 lbs',
      serviceType: 'Entrega Express',
      specialInstructions: 'Suministros curativos sensibles a la temperatura',
    },
    {
      id: 'AP-123458',
      customer: 'Zuko',
      customerEmail: 'zuko@nacionfuego.com',
      from: 'Capital de la Nación del Fuego',
      to: 'Ba Sing Se, Reino Tierra',
      status: 'completed' as const,
      priority: 'standard' as const,
      bison: 'Thunder',
      caretaker: 'Veterano Bumi',
      orderDate: '2024-01-18',
      estimatedDelivery: '2024-01-20',
      value: 680,
      weight: '4,200 lbs',
      serviceType: 'Transporte Comercial',
      specialInstructions: 'Documentos diplomáticos - alta seguridad',
    },
    {
      id: 'AP-123459',
      customer: 'Sokka',
      customerEmail: 'sokka@tribuagua.com',
      from: 'Ciudad República',
      to: 'Isla Kyoshi',
      status: 'scheduled' as const,
      priority: 'standard' as const,
      bison: 'Cloudy',
      caretaker: 'Maestra Opal',
      orderDate: '2024-01-21',
      estimatedDelivery: '2024-01-23',
      value: 280,
      weight: '1,200 lbs',
      serviceType: 'Mudanza Residencial',
      specialInstructions: 'Colección de boomerangs - manejar con cuidado',
    },
    {
      id: 'AP-123460',
      customer: 'Ty Lee',
      customerEmail: 'tylee@guerrerasyoshi.com',
      from: 'Isla Kyoshi',
      to: 'Capital de la Nación del Fuego',
      status: 'cancelled' as const,
      priority: 'low' as const,
      bison: 'N/A',
      caretaker: 'N/A',
      orderDate: '2024-01-19',
      estimatedDelivery: 'N/A',
      value: 0,
      weight: '800 lbs',
      serviceType: 'Entrega Express',
      specialInstructions: 'Cliente canceló por conflicto de horario',
    },
  ]);

  filteredOrders = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const status = this.statusFilter();
    const priority = this.priorityFilter();

    return this.ordersData().filter(order => {
      const matchesSearch =
        order.id.toLowerCase().includes(term) ||
        order.customer.toLowerCase().includes(term) ||
        order.from.toLowerCase().includes(term) ||
        order.to.toLowerCase().includes(term);
      const matchesStatus = status === 'all' || order.status.toLowerCase() === status;
      const matchesPriority = priority === 'all' || order.priority.toLowerCase() === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  });

  ordersSummary = computed(() => {
    const orders = this.ordersData();
    return {
      totalOrders: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      inTransit: orders.filter(o => o.status === 'in_transit').length,
      completed: orders.filter(o => o.status === 'completed').length,
      totalRevenue: orders
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.value, 0),
    };
  });

  clearFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('all');
    this.priorityFilter.set('all');
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in_transit':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'standard':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusTranslation(status: string): string {
    switch (status) {
      case 'pending':
        return 'pendiente';
      case 'scheduled':
        return 'programado';
      case 'in_transit':
        return 'en tránsito';
      case 'completed':
        return 'completado';
      case 'cancelled':
        return 'cancelado';
      default:
        return status;
    }
  }

  getPriorityTranslation(priority: string): string {
    switch (priority) {
      case 'high':
        return 'alta';
      case 'standard':
        return 'estándar';
      case 'low':
        return 'baja';
      default:
        return priority;
    }
  }
}
