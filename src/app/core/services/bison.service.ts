import { inject, Injectable } from '@angular/core';
import { Bison } from '../models/bison.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BisonService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001/bisontes';

  getBisons(): Observable<Bison[]> {
    return this.http
      .get<Bison[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getBison(id: number): Observable<Bison> {
    return this.http
      .get<Bison>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createBison(bison: Omit<Bison, 'id' | 'createdAt' | 'updatedAt'>): Observable<Bison> {
    return this.http
      .post<Bison>(this.apiUrl, bison)
      .pipe(catchError(this.handleError));
  }

  updateBison(id: number, bison: Partial<Bison>): Observable<Bison> {
    return this.http
      .put<Bison>(`${this.apiUrl}/${id}`, bison)
      .pipe(catchError(this.handleError));
  }

  deleteBison(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
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
