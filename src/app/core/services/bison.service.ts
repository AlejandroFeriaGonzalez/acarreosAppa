import { Injectable, signal } from '@angular/core';
import { Bison } from '../models/bison.model';

@Injectable({
  providedIn: 'root'
})
export class BisonService {
  private bisons = signal<Bison[]>([
    { id: '1', name: 'Bison 1', age: 5, healthStatus: 'healthy', currentLocation: 'Field A' },
    { id: '2', name: 'Bison 2', age: 8, healthStatus: 'sick', currentLocation: 'Barn' },
  ]);

  getBisons() {
    return this.bisons.asReadonly();
  }
}
