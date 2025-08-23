import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Caretaker } from '../models/caretaker.model';

@Injectable({
  providedIn: 'root'
})
export class CaretakerService {
  private caretakers = signal<Caretaker[]>([
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      contactInfo: '123-456-7890', 
      experience: 5,
      specialization: 'veterinaria',
      assignedBison: ['1'], 
      workSchedule: 'Mon-Fri' 
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      email: 'jane.smith@example.com',
      phone: '098-765-4321',
      contactInfo: '098-765-4321', 
      experience: 3,
      specialization: 'alimentacion',
      assignedBison: ['2'], 
      workSchedule: 'Weekends' 
    },
  ]);

  getCaretakers() {
    return this.caretakers.asReadonly();
  }

  createCaretaker(caretakerData: Pick<Caretaker, 'name' | 'email' | 'phone' | 'experience' | 'specialization'>): Observable<Caretaker> {
    const newCaretaker: Caretaker = {
      ...caretakerData,
      id: this.generateId(),
      contactInfo: caretakerData.phone, // Usamos phone como contactInfo por compatibilidad
      assignedBison: [],
      workSchedule: 'Por definir'
    };
    
    const currentCaretakers = this.caretakers();
    this.caretakers.set([...currentCaretakers, newCaretaker]);
    
    return of(newCaretaker);
  }

  private generateId(): string {
    return Date.now().toString();
  }
}
