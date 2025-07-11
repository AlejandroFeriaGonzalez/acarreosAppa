import { ChangeDetectionStrategy, Component, Signal, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Wind, ArrowLeft, Search, Star, MapPin, Heart } from 'lucide-angular';

interface Bison {
  id: number;
  name: string;
  age: number;
  status: string;
  specialization: string;
  rating: number;
  location: string;
  caretaker: string;
  completedJobs: number;
  description: string;
}

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

  readonly bisonData: Signal<Bison[]> = signal([
    { id: 1, name: 'Appa Jr.', age: 8, status: 'Disponible', specialization: 'Largas distancias', rating: 5, location: 'Isla del Templo del Aire', caretaker: 'Maestra Jinora', completedJobs: 247, description: 'Descendiente del legendario Appa, especializado en entregas entre naciones.' },
    { id: 2, name: 'Nimbus', age: 12, status: 'En camino', specialization: 'Entrega express', rating: 4.8, location: 'En ruta a la Nación del Fuego', caretaker: 'Maestro Aire Kai', completedJobs: 189, description: 'El bisonte más rápido de nuestra flota, perfecto para entregas urgentes.' },
    { id: 3, name: 'Cloudy', age: 6, status: 'Disponible', specialization: 'Articulos fragiles', rating: 4.9, location: 'Estación Ba Sing Se', caretaker: 'Maestra Opal', completedJobs: 156, description: 'Suave y cuidadoso, ideal para transportar carga delicada.' },
    { id: 4, name: 'Thunder', age: 15, status: 'Mantenimiento', specialization: 'Carga pesada', rating: 4.7, location: 'Depósito Ciudad República', caretaker: 'Veterano Bumi', completedJobs: 312, description: 'Nuestro bisonte más fuerte, capaz de transportar las cargas más pesadas.' },
    { id: 5, name: 'Whisper', age: 4, status: 'Disponible', specialization: 'Entrega discreta', rating: 4.6, location: 'Templo del Aire del Norte', caretaker: 'Maestra Ikki', completedJobs: 98, description: 'Joven pero hábil, perfecto para entregas discretas y silenciosas.' },
    { id: 6, name: 'Breeze', age: 10, status: 'Disponible', specialization: 'Transporte de pasajeros', rating: 4.9, location: 'Tribu Agua del Sur', caretaker: 'Maestro Aire Meelo', completedJobs: 203, description: 'Vuelo cómodo y suave, excelente para servicios de pasajeros.' }
  ]);

  searchTerm = signal('');
  statusFilter = signal('all');
  specializationFilter = signal('all');

  filteredBison = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const status = this.statusFilter();
    const specialization = this.specializationFilter();

    return this.bisonData().filter(bison => {
      const matchesSearch = bison.name.toLowerCase().includes(term) || bison.caretaker.toLowerCase().includes(term);
      const matchesStatus = status === 'all' || bison.status.toLowerCase() === status;
      const matchesSpecialization = specialization === 'all' || bison.specialization.toLowerCase().includes(specialization);

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

  fleetStatistics = computed(() => ({
    totalBison: this.bisonData().length,
    availableBison: this.bisonData().filter(b => b.status === 'Disponible').length,
    totalDeliveries: this.bisonData().reduce((sum, b) => sum + b.completedJobs, 0),
    averageRating: (this.bisonData().reduce((sum, b) => sum + b.rating, 0) / this.bisonData().length).toFixed(1),
  }));
}
