import { inject, Injectable, signal } from '@angular/core';
import { Order } from '../models/order.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

// Define el tipo para el body de creación de orden
export interface CreateOrderPayload {
  numero_guia: string;
  observaciones: string;
  usuarioId: number;
  bisontelId: number;
  items: Array<{
    descripcion: string;
    cantidad: number;
    peso: number;
    prioridad: string;
    estado: string;
    precio: number;
    origen: string;
    destino: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:3001/envios')
      .pipe(catchError(this.handleError));
  }

  // numeroGuia es el id de seguimiento
  getOrderByNumeroGuia(numeroGuia: string): Observable<Order> {
    return this.http.get<Order>(`http://localhost:3001/envios/${numeroGuia}`)
      .pipe(catchError(this.handleError));
  }

  createOrder(payload: CreateOrderPayload): Observable<Order> {
    return this.http.post<Order>('http://localhost:3001/envios', payload)
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
