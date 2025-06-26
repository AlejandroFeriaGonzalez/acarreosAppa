import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Users, Plus, Search, Edit, Phone, Mail, Calendar, Wind } from 'lucide-angular';

const caretakersData = [
  {
    id: 1,
    name: 'Maestra Jinora',
    email: 'jinora@appaacarreos.com',
    phone: '+1 (555) 0101',
    status: 'Active',
    specialization: 'Senior Airbender',
    assignedBison: ['Appa Jr.', 'Whisper'],
    experience: '15 años',
    certifications: ['Master Airbender', 'Animal Care Specialist', 'Flight Safety'],
    schedule: 'Full-time',
    location: 'Isla del Templo del Aire',
    joinDate: '2019-03-15',
  },
  {
    id: 2,
    name: 'Maestro del Aire Kai',
    email: 'kai@appaacarreos.com',
    phone: '+1 (555) 0102',
    status: 'Active',
    specialization: 'Express Operations',
    assignedBison: ['Nimbus'],
    experience: '8 años',
    certifications: ['Airbender Level 3', 'Speed Flight Certified'],
    schedule: 'Full-time',
    location: 'Ciudad República',
    joinDate: '2020-07-22',
  },
  {
    id: 3,
    name: 'Maestra Opal',
    email: 'opal@appaacarreos.com',
    phone: '+1 (555) 0103',
    status: 'Active',
    specialization: 'Fragile Cargo',
    assignedBison: ['Cloudy'],
    experience: '12 años',
    certifications: ['Master Airbender', 'Delicate Handling Specialist'],
    schedule: 'Full-time',
    location: 'Estación Ba Sing Se',
    joinDate: '2018-11-08',
  },
  {
    id: 4,
    name: 'Veterano Bumi',
    email: 'bumi@appaacarreos.com',
    phone: '+1 (555) 0104',
    status: 'On Leave',
    specialization: 'Heavy Cargo',
    assignedBison: ['Thunder'],
    experience: '25 años',
    certifications: ['Master Airbender', 'Heavy Lift Certified', 'Veteran Status'],
    schedule: 'Part-time',
    location: 'Depósito de Ciudad República',
    joinDate: '2015-01-12',
  },
  {
    id: 5,
    name: 'Maestra Ikki',
    email: 'ikki@appaacarreos.com',
    phone: '+1 (555) 0105',
    status: 'Active',
    specialization: 'Stealth Operations',
    assignedBison: ['Whisper'],
    experience: '10 años',
    certifications: ['Master Airbender', 'Stealth Flight Certified'],
    schedule: 'Full-time',
    location: 'Templo del Aire del Norte',
    joinDate: '2019-09-30',
  },
];

@Component({
  selector: 'app-caretaker',
  imports: [LucideAngularModule, FormsModule, RouterLink],
  templateUrl: './caretaker.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Caretaker {
  readonly Users = Users;
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Edit = Edit;
  readonly Phone = Phone;
  readonly Mail = Mail;
  readonly Calendar = Calendar;
  readonly Wind = Wind;

  searchTerm = signal('');
  statusFilter = signal('all');
  specializationFilter = signal('all');

  caretakers = signal(caretakersData);

  filteredCaretakers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const status = this.statusFilter();
    const specialization = this.specializationFilter().toLowerCase();

    return this.caretakers().filter(caretaker => {
      const matchesSearch =
        caretaker.name.toLowerCase().includes(term) || caretaker.email.toLowerCase().includes(term);
      const matchesStatus = status === 'all' || caretaker.status.toLowerCase() === status;
      const matchesSpecialization =
        specialization === 'all' || caretaker.specialization.toLowerCase().includes(specialization);

      return matchesSearch && matchesStatus && matchesSpecialization;
    });
  });

  teamSummary = computed(() => {
    const allCaretakers = this.caretakers();
    const total = allCaretakers.length;
    if (total === 0) {
      return { total: 0, active: 0, totalAssignments: 0, avgExperience: 0 };
    }
    const active = allCaretakers.filter(c => c.status === 'Active').length;
    const totalAssignments = allCaretakers.reduce((sum, c) => sum + c.assignedBison.length, 0);
    const avgExperience = Math.round(
      allCaretakers.reduce((sum, c) => sum + Number.parseInt(c.experience), 0) / total,
    );
    return { total, active, totalAssignments, avgExperience };
  });

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'on leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusTranslation(status: string): string {
    switch (status) {
      case 'Active':
        return 'Activo';
      case 'On Leave':
        return 'Con Permiso';
      case 'Inactive':
        return 'Inactivo';
      default:
        return status;
    }
  }

  getScheduleTranslation(schedule: string): string {
    switch (schedule) {
      case 'Full-time':
        return 'Tiempo completo';
      case 'Part-time':
        return 'Medio tiempo';
      default:
        return schedule;
    }
  }

  getCertificationTranslation(certification: string): string {
    switch (certification) {
      case 'Master Airbender':
        return 'Maestro del Aire';
      case 'Animal Care Specialist':
        return 'Especialista en Cuidado Animal';
      case 'Flight Safety':
        return 'Seguridad de Vuelo';
      case 'Airbender Level 3':
        return 'Maestro del Aire Nivel 3';
      case 'Speed Flight Certified':
        return 'Certificado en Vuelo Rápido';
      case 'Delicate Handling Specialist':
        return 'Especialista en Manejo Delicado';
      case 'Heavy Lift Certified':
        return 'Certificado en Carga Pesada';
      case 'Veteran Status':
        return 'Estado Veterano';
      case 'Stealth Flight Certified':
        return 'Certificado en Vuelo Sigiloso';
      default:
        return certification;
    }
  }

  getSpecializationTranslation(specialization: string): string {
    switch (specialization) {
      case 'Senior Airbender':
        return 'Maestro del Aire Senior';
      case 'Express Operations':
        return 'Operaciones Express';
      case 'Fragile Cargo':
        return 'Carga Frágil';
      case 'Heavy Cargo':
        return 'Carga Pesada';
      case 'Stealth Operations':
        return 'Operaciones Sigilosas';
      default:
        return specialization;
    }
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('all');
    this.specializationFilter.set('all');
  }
}
