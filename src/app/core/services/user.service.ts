import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001/usuarios';

  getUsers() {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    )
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(id: number, user: User) {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user).pipe(
      catchError(this.handleError)
    )
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
