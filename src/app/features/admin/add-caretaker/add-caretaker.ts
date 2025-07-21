import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CaretakerService } from '../../../core/services/caretaker.service';
import { Caretaker } from '../../../core/models/caretaker.model';

@Component({
    selector: 'app-add-caretaker',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './add-caretaker.html',
})
export class AddCaretaker {
    caretaker: Pick<Caretaker, 'name' | 'email' | 'phone' | 'experience' | 'specialization'> = {
        name: '',
        email: '',
        phone: '',
        experience: 0,
        specialization: ''
    };

    constructor(
        private caretakerService: CaretakerService,
        private router: Router
    ) { }

    onSubmit(): void {
        if (this.isFormValid()) {
            this.caretakerService.createCaretaker(this.caretaker).subscribe({
                next: (response: Caretaker) => {
                    console.log('Cuidador creado exitosamente:', response);
                    alert('Cuidador agregado exitosamente');
                    this.router.navigate(['/admin/caretaker']);
                },
                error: (error: any) => {
                    console.error('Error al crear cuidador:', error);
                    alert('Error al agregar el cuidador. Por favor, intenta de nuevo.');
                }
            });
        }
    }

    onCancel(): void {
        this.router.navigate(['/admin/caretaker']);
    }

    private isFormValid(): boolean {
        return !!(
            this.caretaker.name &&
            this.caretaker.email &&
            this.caretaker.phone &&
            this.caretaker.experience !== undefined &&
            this.caretaker.specialization
        );
    }
}
