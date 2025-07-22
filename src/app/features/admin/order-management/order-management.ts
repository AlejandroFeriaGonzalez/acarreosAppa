import { ChangeDetectionStrategy, Component, computed, signal, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { LucideAngularModule, Package, Search, Edit, MapPin, Calendar, DollarSign, User, Wind } from 'lucide-angular';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';


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

  private orderService = inject(OrderService);

  searchTerm = signal('');
  statusFilter = signal('all');
  priorityFilter = signal('all');

  ordersData = signal<Order[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    effect(() => {
      this.orderService.getOrders().subscribe({
        next: (orders) => {
          this.ordersData.set(orders);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err.message ?? 'Error loading orders');
          this.loading.set(false);
        }
      });
    });
  }

  filteredOrders = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const status = this.statusFilter();
    const priority = this.priorityFilter();
    return this.ordersData().filter(order => {
      // Adaptar los campos según el modelo real
      const matchesSearch =
        order.numero_guia?.toLowerCase().includes(term) ||
        order.observaciones?.toLowerCase().includes(term);
      const matchesStatus = status === 'all' || order.tbl_detalle_items.some(item => item.estado.toLowerCase() === status);
      const matchesPriority = priority === 'all' || order.tbl_detalle_items.some(item => item.prioridad.toLowerCase() === priority);
      return matchesSearch && matchesStatus && matchesPriority;
    });
  });

  ordersSummary = computed(() => {
    const orders = this.ordersData();
    return {
      totalOrders: orders.length,
      pending: orders.filter(o => o.tbl_detalle_items.some(i => i.estado === 'pending')).length,
      inTransit: orders.filter(o => o.tbl_detalle_items.some(i => i.estado === 'in_transit')).length,
      completed: orders.filter(o => o.tbl_detalle_items.some(i => i.estado === 'completed')).length,
      totalRevenue: orders
        .filter(o => !o.tbl_detalle_items.some(i => i.estado === 'cancelled'))
        .reduce((sum, o) => sum + o.tbl_detalle_items.reduce((s, i) => s + Number(i.precio), 0), 0),
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
}
