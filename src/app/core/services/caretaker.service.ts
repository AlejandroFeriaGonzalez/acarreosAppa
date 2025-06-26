import { Injectable, signal } from '@angular/core';
import { Caretaker } from '../models/caretaker.model';

@Injectable({
  providedIn: 'root'
})
export class CaretakerService {
  private caretakers = signal<Caretaker[]>([
    { id: '1', name: 'John Doe', contactInfo: '123-456-7890', assignedBison: ['1'], workSchedule: 'Mon-Fri' },
    { id: '2', name: 'Jane Smith', contactInfo: '098-765-4321', assignedBison: ['2'], workSchedule: 'Weekends' },
  ]);

  getCaretakers() {
    return this.caretakers.asReadonly();
  }
}
