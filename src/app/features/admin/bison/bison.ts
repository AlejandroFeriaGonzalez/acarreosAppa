import { ChangeDetectionStrategy, Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { BisonService } from '../../../core/services/bison.service';
import { Bison } from '../../../core/models/bison.model';

@Component({
  selector: 'app-bison',
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './bison.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BisonComponent {
  readonly Wind = Wind;
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Edit = Edit;
  readonly MapPin = MapPin;
  readonly Heart = Heart;
  readonly Activity = Activity;
  readonly Calendar = Calendar;

  private bisonService = inject(BisonService);

  bisons = signal<Bison[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  searchTerm = signal('');
  statusFilter = signal('all');
  healthFilter = signal('all');

  constructor() {
    this.bisonService.getBisons().subscribe({
      next: (bisons: Bison[]) => {
        this.bisons.set(bisons);
        this.loading.set(false);
      },
      error: (err: unknown) => {
        this.error.set((err as Error).message ?? 'Error desconocido');
        this.loading.set(false);
      }
    });
  }

  filteredBison = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const status = this.statusFilter();
    const health = this.healthFilter();
    return this.bisons().filter(bison => {
      const matchesSearch = bison.nombre.toLowerCase().includes(term);
      const matchesStatus = status === 'all' || bison.estado.toLowerCase() === status.toLowerCase();
      const matchesHealth = health === 'all' || bison.salud.toLowerCase() === health.toLowerCase();
      return matchesSearch && matchesStatus && matchesHealth;
    });
  });

  totalBison = computed(() => this.bisons().length);
  availableBison = computed(() => this.bisons().filter(b => b.estado === 'disponible').length);
  needsAttentionBison = computed(() => this.bisons().filter(b => b.salud === 'regular' || b.salud === 'mala').length);
  avgFlightHours = computed(() => {
    const bisons = this.bisons();
    if (bisons.length === 0) return 0;
    const totalHours = bisons.reduce((sum, b) => sum + (b.horas_vuelo || 0), 0);
    return Math.round(totalHours / bisons.length);
  });

  updateSearchTerm(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  updateStatusFilter(event: Event): void {
    this.statusFilter.set((event.target as HTMLSelectElement).value);
  }

  updateHealthFilter(event: Event): void {
    this.healthFilter.set((event.target as HTMLSelectElement).value);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('all');
    this.healthFilter.set('all');
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'disponible':
        return 'bg-green-100 text-green-800';
      case 'en camino':
        return 'bg-blue-100 text-blue-800';
      case 'mantenimiento':
        return 'bg-yellow-100 text-yellow-800';
      case 'descanso':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getHealthColor(health: string): string {
    switch (health.toLowerCase()) {
      case 'excelente':
        return 'text-green-600';
      case 'buena':
        return 'text-blue-600';
      case 'regular':
        return 'text-yellow-600';
      case 'mala':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}
