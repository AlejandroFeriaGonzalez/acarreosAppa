import { ChangeDetectionStrategy, Component, Signal, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, LucideAngularModule],
})
export class Inventory {
  readonly ArrowLeft = ArrowLeft;
  readonly Wind = Wind;
  readonly Search = Search;
  readonly Star = Star;
  readonly MapPin = MapPin;
  readonly Heart = Heart;

  readonly bisonData: Signal<Bison[]> = signal([
    { id: 1, name: 'Appa Jr.', age: 8, status: 'Disponible', specialization: 'Long Distance', rating: 5, location: 'Air Temple Island', caretaker: 'Master Jinora', completedJobs: 247, description: 'Descendant of the legendary Appa, specializes in cross-nation deliveries.' },
    { id: 2, name: 'Nimbus', age: 12, status: 'In Transit', specialization: 'Express Delivery', rating: 4.8, location: 'En route to Fire Nation', caretaker: 'Airbender Kai', completedJobs: 189, description: 'Fastest bison in our fleet, perfect for urgent deliveries.' },
    { id: 3, name: 'Cloudy', age: 6, status: 'Disponible', specialization: 'Fragile Items', rating: 4.9, location: 'Ba Sing Se Station', caretaker: 'Master Opal', completedJobs: 156, description: 'Gentle and careful, ideal for transporting delicate cargo.' },
    { id: 4, name: 'Thunder', age: 15, status: 'Maintenance', specialization: 'Heavy Cargo', rating: 4.7, location: 'Republic City Depot', caretaker: 'Veteran Bumi', completedJobs: 312, description: 'Our strongest bison, capable of carrying the heaviest loads.' },
    { id: 5, name: 'Whisper', age: 4, status: 'Disponible', specialization: 'Stealth Delivery', rating: 4.6, location: 'Northern Air Temple', caretaker: 'Master Ikki', completedJobs: 98, description: 'Young but skilled, perfect for discrete and quiet deliveries.' },
    { id: 6, name: 'Breeze', age: 10, status: 'Disponible', specialization: 'Passenger Transport', rating: 4.9, location: 'Southern Water Tribe', caretaker: 'Airbender Meelo', completedJobs: 203, description: 'Comfortable and smooth flying, great for passenger services.' }
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
      case 'in transit': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
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
