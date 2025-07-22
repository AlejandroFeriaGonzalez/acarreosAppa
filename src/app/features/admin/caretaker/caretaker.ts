import { ChangeDetectionStrategy, Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { LucideAngularModule, Users, Plus, Search, Edit, Phone, Mail, Calendar, Wind } from 'lucide-angular';
import { CaretakerService } from '../../../core/services/caretaker.service';
import { Caretaker } from '../../../core/models/caretaker.model';

@Component({
  selector: 'app-caretaker',
  imports: [CommonModule, LucideAngularModule, FormsModule, RouterLink],
  templateUrl: './caretaker.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaretakerComponent {
  readonly Users = Users;
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Edit = Edit;
  readonly Phone = Phone;
  readonly Mail = Mail;
  readonly Calendar = Calendar;
  readonly Wind = Wind;

  private caretakerService = inject(CaretakerService);
  private router = inject(Router);

  caretakers = signal<Caretaker[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  searchTerm = signal('');
  statusFilter = signal('all');
  specializationFilter = signal('all');

  constructor() {
    this.caretakerService.getCaretakers().subscribe({
      next: (caretakers: Caretaker[]) => {
        this.caretakers.set(caretakers);
        this.loading.set(false);
      },
      error: (err: unknown) => {
        this.error.set((err as Error).message ?? 'Error desconocido');
        this.loading.set(false);
      }
    });
  }

  filteredCaretakers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const status = this.statusFilter();
    const specialization = this.specializationFilter().toLowerCase();
    return this.caretakers().filter(caretaker => {
      const matchesSearch = caretaker.nombre.toLowerCase().includes(term);
      const matchesStatus = status === 'all' || caretaker.estado.toLowerCase() === status;
      const matchesSpecialization = specialization === 'all' || caretaker.cargo.toLowerCase().includes(specialization);
      return matchesSearch && matchesStatus && matchesSpecialization;
    });
  });

  teamSummary = computed(() => {
    const allCaretakers = this.caretakers();
    const total = allCaretakers.length;
    if (total === 0) {
      return { total: 0, active: 0, totalAssignments: 0, avgExperience: 0 };
    }
    const active = allCaretakers.filter(c => c.estado === 'activo').length;
    // Asignaciones y experiencia pueden requerir ajuste según el modelo real
    const totalAssignments = total; // Si no hay campo de asignaciones, usar total
    const avgExperience = Math.round(
      allCaretakers.reduce((sum, c) => sum + Number.parseInt(c.experiencia), 0) / total
    );
    return { total, active, totalAssignments, avgExperience };
  });

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'permiso':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactivo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusTranslation(status: string): string {
    switch (status.toLowerCase()) {
      case 'activo':
        return 'Activo';
      case 'permiso':
        return 'Con Permiso';
      case 'inactivo':
        return 'Inactivo';
      default:
        return status;
    }
  }

  getScheduleTranslation(schedule: string): string {
    switch (schedule.toLowerCase()) {
      case 'tiempo completo':
        return 'Tiempo completo';
      case 'medio tiempo':
        return 'Medio tiempo';
      default:
        return schedule;
    }
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('all');
    this.specializationFilter.set('all');
  }

  navigateToAddCaretaker(): void {
    this.router.navigate(['/admin/add-caretaker']);
  }
}
