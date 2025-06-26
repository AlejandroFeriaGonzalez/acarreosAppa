import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Users, Plus, Search, Edit, Phone, Mail, Calendar, Wind } from 'lucide-angular';

const caretakersData = [
  {
    id: 1,
    name: 'Master Jinora',
    email: 'jinora@appahauling.com',
    phone: '+1 (555) 0101',
    status: 'Active',
    specialization: 'Senior Airbender',
    assignedBison: ['Appa Jr.', 'Whisper'],
    experience: '15 years',
    certifications: ['Master Airbender', 'Animal Care Specialist', 'Flight Safety'],
    schedule: 'Full-time',
    location: 'Air Temple Island',
    joinDate: '2019-03-15',
  },
  {
    id: 2,
    name: 'Airbender Kai',
    email: 'kai@appahauling.com',
    phone: '+1 (555) 0102',
    status: 'Active',
    specialization: 'Express Operations',
    assignedBison: ['Nimbus'],
    experience: '8 years',
    certifications: ['Airbender Level 3', 'Speed Flight Certified'],
    schedule: 'Full-time',
    location: 'Republic City',
    joinDate: '2020-07-22',
  },
  {
    id: 3,
    name: 'Master Opal',
    email: 'opal@appahauling.com',
    phone: '+1 (555) 0103',
    status: 'Active',
    specialization: 'Fragile Cargo',
    assignedBison: ['Cloudy'],
    experience: '12 years',
    certifications: ['Master Airbender', 'Delicate Handling Specialist'],
    schedule: 'Full-time',
    location: 'Ba Sing Se Station',
    joinDate: '2018-11-08',
  },
  {
    id: 4,
    name: 'Veteran Bumi',
    email: 'bumi@appahauling.com',
    phone: '+1 (555) 0104',
    status: 'On Leave',
    specialization: 'Heavy Cargo',
    assignedBison: ['Thunder'],
    experience: '25 years',
    certifications: ['Master Airbender', 'Heavy Lift Certified', 'Veteran Status'],
    schedule: 'Part-time',
    location: 'Republic City Depot',
    joinDate: '2015-01-12',
  },
  {
    id: 5,
    name: 'Master Ikki',
    email: 'ikki@appahauling.com',
    phone: '+1 (555) 0105',
    status: 'Active',
    specialization: 'Stealth Operations',
    assignedBison: ['Whisper'],
    experience: '10 years',
    certifications: ['Master Airbender', 'Stealth Flight Certified'],
    schedule: 'Full-time',
    location: 'Northern Air Temple',
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

  clearFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('all');
    this.specializationFilter.set('all');
  }
}
