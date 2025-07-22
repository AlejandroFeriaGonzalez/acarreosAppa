import { inject, Injectable, signal } from '@angular/core';
import { Order } from '../models/order.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:3001/envios')
      .pipe(catchError(this.handleError));
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`http://localhost:3001/envios/${id}`)
      .pipe(catchError(this.handleError));
  }

  createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Observable<Order> {
    return this.http.post<Order>('http://localhost:3001/envios', order)
      .pipe(catchError(this.handleError));
  }

  updateOrder(id: number, order: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(`http://localhost:3001/envios/${id}`, order)
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
