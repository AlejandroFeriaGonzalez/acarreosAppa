import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CaretakerService } from '../../../core/services/caretaker.service';
import { Caretaker } from '../../../core/models/caretaker.model';

@Component({
  selector: 'app-add-caretaker',
  templateUrl: './add-caretaker.html',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCaretakerComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private caretakerService = inject(CaretakerService);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  caretakerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    cargo: ['', [Validators.required]],
    certificacion: ['', [Validators.required]],
    experiencia: ['', [Validators.required]],
    estado: ['activo', [Validators.required]],
    horario_trabajo: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    fecha_registro: [new Date().toISOString().split('T')[0], [Validators.required]]
  });

  onSubmit() {
    if (this.caretakerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      this.successMessage.set(null);

      const formValue = this.caretakerForm.value;
      const caretakerData: Omit<Caretaker, 'id' | 'createdAt' | 'updatedAt'> = {
        ...formValue,
        fecha_registro: new Date(formValue.fecha_registro)
      };

      this.caretakerService.createCaretaker(caretakerData).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.successMessage.set('Cuidador agregado exitosamente');
          setTimeout(() => {
            this.router.navigate(['/admin/caretaker']);
          }, 2000);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set('Error al agregar el cuidador. Por favor, intente nuevamente.');
          console.error('Error creating caretaker:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel() {
    this.router.navigate(['/admin/caretaker']);
  }

  private markFormGroupTouched() {
    Object.keys(this.caretakerForm.controls).forEach(key => {
      const control = this.caretakerForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string | null {
    const field = this.caretakerForm.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) {
        return 'Este campo es requerido';
      }
      if (field.errors['minlength']) {
        return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      }
      if (field.errors['pattern']) {
        return 'Formato inválido';
      }
    }
    return null;
  }
}
