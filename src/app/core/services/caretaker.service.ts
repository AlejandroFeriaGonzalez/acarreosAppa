import { inject, Injectable, signal } from '@angular/core';
import { Caretaker } from '../models/caretaker.model';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CaretakerService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001/cuidadores';

  getCaretakers() {
    return this.http
      .get<Caretaker[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getCaretaker(id: number) {
    return this.http
      .get<Caretaker>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createCaretaker(caretaker: Omit<Caretaker, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.http
      .post<Caretaker>(this.apiUrl, caretaker)
      .pipe(catchError(this.handleError));
  }

  updateCaretaker(id: number, caretaker: Partial<Caretaker>) {
    return this.http
      .put<Caretaker>(`${this.apiUrl}/${id}`, caretaker)
      .pipe(catchError(this.handleError));
  }

  // Manejo de errores centralizado
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
