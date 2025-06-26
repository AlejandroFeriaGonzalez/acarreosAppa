import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  Wind,
  Plus,
  Search,
  Edit,
  MapPin,
  Heart,
  Activity,
  Calendar,
} from 'lucide-angular';

type BisonStatus = 'Available' | 'In Transit' | 'Maintenance' | 'Rest';
type BisonHealth = 'Excellent' | 'Good' | 'Fair' | 'Poor';

interface bisonData {
  id: number;
  name: string;
  age: number;
  status: BisonStatus;
  health: BisonHealth;
  location: string;
  caretaker: string;
  lastCheckup: string;
  flightHours: number;
  specialization: string;
  weight: string;
  wingspan: string;
}

@Component({
  selector: 'app-bison',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './bison.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Bison {
  readonly Wind = Wind;
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Edit = Edit;
  readonly MapPin = MapPin;
  readonly Heart = Heart;
  readonly Activity = Activity;
  readonly Calendar = Calendar;

  readonly bisonData: readonly bisonData[] = [
    {
      id: 1,
      name: 'Appa Jr.',
      age: 8,
      status: 'Available',
      health: 'Excellent',
      location: 'Air Temple Island',
      caretaker: 'Master Jinora',
      lastCheckup: '2024-01-15',
      flightHours: 1247,
      specialization: 'Long Distance',
      weight: '10,000 lbs',
      wingspan: '30 ft',
    },
    {
      id: 2,
      name: 'Nimbus',
      age: 12,
      status: 'In Transit',
      health: 'Good',
      location: 'En route to Fire Nation',
      caretaker: 'Airbender Kai',
      lastCheckup: '2024-01-10',
      flightHours: 1890,
      specialization: 'Express Delivery',
      weight: '9,500 lbs',
      wingspan: '28 ft',
    },
    {
      id: 3,
      name: 'Cloudy',
      age: 6,
      status: 'Available',
      health: 'Excellent',
      location: 'Ba Sing Se Station',
      caretaker: 'Master Opal',
      lastCheckup: '2024-01-18',
      flightHours: 856,
      specialization: 'Fragile Items',
      weight: '8,800 lbs',
      wingspan: '26 ft',
    },
    {
      id: 4,
      name: 'Thunder',
      age: 15,
      status: 'Maintenance',
      health: 'Fair',
      location: 'Republic City Depot',
      caretaker: 'Veteran Bumi',
      lastCheckup: '2024-01-05',
      flightHours: 2312,
      specialization: 'Heavy Cargo',
      weight: '12,000 lbs',
      wingspan: '35 ft',
    },
  ];

  searchTerm = signal('');
  statusFilter = signal<BisonStatus | 'all'>('all');
  healthFilter = signal<BisonHealth | 'all'>('all');

  filteredBison = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const status = this.statusFilter();
    const health = this.healthFilter();

    return this.bisonData.filter(bison => {
      const matchesSearch =
        bison.name.toLowerCase().includes(term) || bison.caretaker.toLowerCase().includes(term);
      const matchesStatus = status === 'all' || bison.status === status;
      const matchesHealth = health === 'all' || bison.health === health;

      return matchesSearch && matchesStatus && matchesHealth;
    });
  });

  totalBison = computed(() => this.bisonData.length);
  availableBison = computed(() => this.bisonData.filter(b => b.status === 'Available').length);
  needsAttentionBison = computed(
    () => this.bisonData.filter(b => b.health === 'Fair' || b.health === 'Poor').length,
  );
  avgFlightHours = computed(() => {
    if (this.bisonData.length === 0) return 0;
    const totalHours = this.bisonData.reduce((sum, b) => sum + b.flightHours, 0);
    return Math.round(totalHours / this.bisonData.length);
  });

  updateSearchTerm(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  updateStatusFilter(event: Event): void {
    this.statusFilter.set((event.target as HTMLSelectElement).value as BisonStatus | 'all');
  }

  updateHealthFilter(event: Event): void {
    this.healthFilter.set((event.target as HTMLSelectElement).value as BisonHealth | 'all');
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('all');
    this.healthFilter.set('all');
  }

  getStatusColor(status: BisonStatus): string {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rest':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getHealthColor(health: BisonHealth): string {
    switch (health) {
      case 'Excellent':
        return 'text-green-600';
      case 'Good':
        return 'text-blue-600';
      case 'Fair':
        return 'text-yellow-600';
      case 'Poor':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
