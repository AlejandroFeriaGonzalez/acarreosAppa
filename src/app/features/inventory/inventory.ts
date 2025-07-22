import { ChangeDetectionStrategy, Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Wind, ArrowLeft, Search, Star, MapPin, Heart } from 'lucide-angular';
import { BisonService } from '../../core/services/bison.service';
import { Bison } from '../../core/models/bison.model';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, LucideAngularModule],
})
export class Inventory {
  readonly ArrowLeft = ArrowLeft;
  readonly Wind = Wind;
  readonly Search = Search;
  readonly Star = Star;
  readonly MapPin = MapPin;
  readonly Heart = Heart;

  private bisonService = inject(BisonService);

  bisons = signal<Bison[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  searchTerm = signal('');
  statusFilter = signal('all');
  specializationFilter = signal('all');

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
    const specialization = this.specializationFilter();
    return this.bisons().filter(bison => {
      const matchesSearch = bison.nombre.toLowerCase().includes(term);
      const matchesStatus = status === 'all' || bison.estado.toLowerCase() === status;
      const matchesSpecialization = specialization === 'all' || (bison.salud?.toLowerCase().includes(specialization));
      return matchesSearch && matchesStatus && matchesSpecialization;
    });
  });

  clearFilters() {
    this.searchTerm.set('');
    this.statusFilter.set('all');
    this.specializationFilter.set('all');
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'disponible': return 'bg-green-100 text-green-800';
      case 'en camino': return 'bg-blue-100 text-blue-800';
      case 'mantenimiento': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  fleetStatistics = computed(() => {
    const bisons = this.bisons();
    return {
      totalBison: bisons.length,
      availableBison: bisons.filter(b => b.estado === 'Disponible').length,
      totalDeliveries: bisons.reduce((sum, b) => sum + (b.horas_vuelo || 0), 0),
      averageRating: bisons.length ? (bisons.reduce((sum, b) => sum + (parseFloat(b.peso) || 0), 0) / bisons.length).toFixed(1) : '0',
    };
  });
}
