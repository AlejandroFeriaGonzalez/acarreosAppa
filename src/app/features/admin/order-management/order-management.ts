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
      customerEmail: 'toph@earthkingdom.com',
      from: 'Ba Sing Se, Earth Kingdom',
      to: 'Republic City, United Republic',
      status: 'in_transit' as const,
      priority: 'standard' as const,
      bison: 'Appa Jr.',
      caretaker: 'Master Jinora',
      orderDate: '2024-01-20',
      estimatedDelivery: '2024-01-22',
      value: 450,
      weight: '2,500 lbs',
      serviceType: 'Residential Moving',
      specialInstructions: 'Fragile earthbending scrolls included',
    },
    {
      id: 'AP-123457',
      customer: 'Katara',
      customerEmail: 'katara@watertribe.com',
      from: 'Southern Water Tribe',
      to: 'Northern Air Temple',
      status: 'pending' as const,
      priority: 'high' as const,
      bison: 'Unassigned',
      caretaker: 'Unassigned',
      orderDate: '2024-01-21',
      estimatedDelivery: '2024-01-24',
      value: 320,
      weight: '1,800 lbs',
      serviceType: 'Express Delivery',
      specialInstructions: 'Temperature-sensitive healing supplies',
    },
    {
      id: 'AP-123458',
      customer: 'Zuko',
      customerEmail: 'zuko@firenation.com',
      from: 'Fire Nation Capital',
      to: 'Ba Sing Se, Earth Kingdom',
      status: 'completed' as const,
      priority: 'standard' as const,
      bison: 'Thunder',
      caretaker: 'Veteran Bumi',
      orderDate: '2024-01-18',
      estimatedDelivery: '2024-01-20',
      value: 680,
      weight: '4,200 lbs',
      serviceType: 'Commercial Transport',
      specialInstructions: 'Diplomatic documents - high security',
    },
    {
      id: 'AP-123459',
      customer: 'Sokka',
      customerEmail: 'sokka@watertribe.com',
      from: 'Republic City',
      to: 'Kyoshi Island',
      status: 'scheduled' as const,
      priority: 'standard' as const,
      bison: 'Cloudy',
      caretaker: 'Master Opal',
      orderDate: '2024-01-21',
      estimatedDelivery: '2024-01-23',
      value: 280,
      weight: '1,200 lbs',
      serviceType: 'Residential Moving',
      specialInstructions: 'Boomerang collection - handle with care',
    },
    {
      id: 'AP-123460',
      customer: 'Ty Lee',
      customerEmail: 'tylee@kyoshiwarriors.com',
      from: 'Kyoshi Island',
      to: 'Fire Nation Capital',
      status: 'cancelled' as const,
      priority: 'low' as const,
      bison: 'N/A',
      caretaker: 'N/A',
      orderDate: '2024-01-19',
      estimatedDelivery: 'N/A',
      value: 0,
      weight: '800 lbs',
      serviceType: 'Express Delivery',
      specialInstructions: 'Customer cancelled due to schedule conflict',
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
}
