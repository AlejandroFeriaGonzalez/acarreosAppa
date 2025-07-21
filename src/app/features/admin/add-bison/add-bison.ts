import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BisonService } from '../../../core/services/bison.service';
import { Bison } from '../../../core/models/bison.model';

@Component({
    selector: 'app-add-bison',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './add-bison.html',
})
export class AddBison {
    bison: Pick<Bison, 'name' | 'age' | 'weight' | 'breed' | 'gender' | 'healthStatus' | 'currentLocation' | 'dateOfBirth'> = {
        name: '',
        age: 0,
        weight: 0,
        breed: '',
        gender: 'male',
        healthStatus: 'healthy',
        currentLocation: '',
        dateOfBirth: ''
    };

    constructor(
        private bisonService: BisonService,
        private router: Router
    ) { }

    onSubmit(): void {
        if (this.isFormValid()) {
            // Calcular edad basada en fecha de nacimiento
            this.calculateAge();

            this.bisonService.createBison(this.bison).subscribe({
                next: (response: Bison) => {
                    console.log('Bisonte creado exitosamente:', response);
                    alert('Bisonte agregado exitosamente');
                    this.router.navigate(['/admin/bison']);
                },
                error: (error: any) => {
                    console.error('Error al crear bisonte:', error);
                    alert('Error al agregar el bisonte. Por favor, intenta de nuevo.');
                }
            });
        }
    }

    onCancel(): void {
        this.router.navigate(['/admin/bison']);
    }

    private calculateAge(): void {
        if (this.bison.dateOfBirth) {
            const birthDate = new Date(this.bison.dateOfBirth);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                this.bison.age = age - 1;
            } else {
                this.bison.age = age;
            }
        }
    }

    private isFormValid(): boolean {
        return !!(
            this.bison.name &&
            this.bison.age !== undefined &&
            this.bison.weight > 0 &&
            this.bison.breed &&
            this.bison.gender &&
            this.bison.healthStatus &&
            this.bison.currentLocation &&
            this.bison.dateOfBirth
        );
    }
}
