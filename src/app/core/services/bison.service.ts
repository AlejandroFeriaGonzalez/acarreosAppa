import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bison } from '../models/bison.model';

@Injectable({
  providedIn: 'root'
})
export class BisonService {
  private bisons = signal<Bison[]>([
    { 
      id: '1', 
      name: 'Thunder', 
      age: 5, 
      weight: 800,
      breed: 'American Bison',
      gender: 'male',
      healthStatus: 'healthy', 
      currentLocation: 'Field A',
      dateOfBirth: '2019-03-15',
      caretakerId: '1'
    },
    { 
      id: '2', 
      name: 'Storm', 
      age: 8, 
      weight: 750,
      breed: 'Plains Bison',
      gender: 'female',
      healthStatus: 'sick', 
      currentLocation: 'Barn',
      dateOfBirth: '2016-07-22',
      caretakerId: '2'
    },
  ]);

  getBisons() {
    return this.bisons.asReadonly();
  }

  createBison(bisonData: Pick<Bison, 'name' | 'age' | 'weight' | 'breed' | 'gender' | 'healthStatus' | 'currentLocation' | 'dateOfBirth'>): Observable<Bison> {
    const newBison: Bison = {
      ...bisonData,
      id: this.generateId(),
      caretakerId: undefined
    };
    
    const currentBisons = this.bisons();
    this.bisons.set([...currentBisons, newBison]);
    
    return of(newBison);
  }

  private generateId(): string {
    return Date.now().toString();
  }
}
