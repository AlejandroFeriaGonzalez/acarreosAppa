import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BisonService } from '../../../core/services/bison.service';
import { CaretakerService } from '../../../core/services/caretaker.service';
import { Caretaker } from '../../../core/models/caretaker.model';
import { Bison } from '../../../core/models/bison.model';

@Component({
  selector: 'app-add-bison',
  templateUrl: './add-bison.html',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBisonComponent {
  private fb = inject(FormBuilder);
  private bisonService = inject(BisonService);
  private caretakerService = inject(CaretakerService);
  private router = inject(Router);

  caretakers = signal<Caretaker[]>([]);
  isSubmitting = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  bisonForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    edad: [0, [Validators.required, Validators.min(0)]],
    salud: ['', Validators.required],
    peso: ['', Validators.required],
    horas_vuelo: [0, [Validators.required, Validators.min(0)]],
    ultimo_chequeo: ['', Validators.required],
    estado: ['', Validators.required],
    habitat: ['', Validators.required],
    cuidadorId: ['', Validators.required]
  });

  ngOnInit() {
    this.loadCaretakers();
  }

  loadCaretakers() {
    this.caretakerService.getCaretakers().subscribe({
      next: (caretakers) => {
        this.caretakers.set(caretakers);
      },
      error: (error) => {
        this.errorMessage.set('Error al cargar la lista de cuidadores');
        console.error('Error loading caretakers:', error);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.bisonForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.bisonForm.valid) {
      this.isSubmitting.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      const formValue = this.bisonForm.value;
      
      // Convertir valores apropiados
      const bisonData: Omit<Bison, 'id' | 'createdAt' | 'updatedAt'> = {
        nombre: formValue.nombre,
        edad: Number(formValue.edad),
        salud: formValue.salud,
        peso: formValue.peso,
        horas_vuelo: Number(formValue.horas_vuelo),
        ultimo_chequeo: new Date(formValue.ultimo_chequeo),
        estado: formValue.estado,
        habitat: formValue.habitat,
        cuidadorId: Number(formValue.cuidadorId),
        bisonteId: null
      };

      this.bisonService.createBison(bisonData).subscribe({
        next: (createdBison) => {
          this.isSubmitting.set(false);
          this.successMessage.set('Bisonte agregado exitosamente');
          setTimeout(() => {
            this.router.navigate(['/admin/bison']);
          }, 2000);
        },
        error: (error) => {
          this.isSubmitting.set(false);
          this.errorMessage.set('Error al agregar el bisonte. Por favor, intente nuevamente.');
          console.error('Error creating bison:', error);
        }
      });
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.bisonForm.controls).forEach(key => {
        this.bisonForm.get(key)?.markAsTouched();
      });
    }
  }

  goBack() {
    this.router.navigate(['/admin/bison']);
  }
}
