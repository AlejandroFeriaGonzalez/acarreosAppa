import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Wind, ArrowLeft, Search, MapPin, Clock, CheckCircle, Truck } from 'lucide-angular';
import { OrderService } from '../../core/services/order.service';
import { Order, TblDetalleItem } from '../../core/models/order.model';

interface TimelineStep {
  status: string;
  completed: boolean;
  time: string;
  active?: boolean;
}

interface OrderView {
  id: number;
  status: string;
  from: string;
  to: string;
  bisonName: string;
  caretaker: string;
  estimatedArrival: string;
  currentLocation: string;
  timeline: TimelineStep[];
}

@Component({
  selector: 'app-tracking',
  imports: [LucideAngularModule, RouterLink, ReactiveFormsModule],
  templateUrl: './tracking.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackingComponent {
  readonly Wind = Wind;
  readonly ArrowLeft = ArrowLeft;
  readonly Search = Search;
  readonly MapPin = MapPin;
  readonly Clock = Clock;
  readonly CheckCircle = CheckCircle;
  readonly Truck = Truck;

  private orderService = inject(OrderService);

  trackingIdControl = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  orderData = signal<OrderView | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  handleTrack(e: Event): void {
    e.preventDefault();
    if (this.trackingIdControl.invalid) {
      return;
    }
    this.isLoading.set(true);
    this.error.set(null);
    const trackingId = this.trackingIdControl.value;
    this.orderService.getOrderByNumeroGuia(trackingId).subscribe({
      next: (order: Order) => {
        // Transformar datos del modelo Order a OrderView para la vista
        const detalle: TblDetalleItem | undefined = order.tbl_detalle_items?.[0];
        this.orderData.set({
          id: order.id,
          status: detalle?.estado ?? 'Desconocido',
          from: detalle?.origen ?? '',
          to: detalle?.destino ?? '',
          bisonName: order.bisonteId ? `Bisonte #${order.bisonteId}` : 'No asignado',
          caretaker: 'No disponible',
          estimatedArrival: 'No disponible',
          currentLocation: detalle?.estado === 'en camino' ? detalle?.destino ?? '' : '',
          timeline: [
            { status: 'Pedido realizado', completed: true, time: this.formatDate(order.createdAt) },
            { status: 'Bisonte asignado', completed: !!order.bisonteId, time: this.formatDate(order.updatedAt) },
            { status: 'Recogida completada', completed: detalle?.estado === 'recogido', time: '' },
            { status: 'En camino', completed: detalle?.estado === 'en camino', time: '' },
            { status: 'Fuera de entrega', completed: detalle?.estado === 'fuera de entrega', time: '' },
            { status: 'Entregado', completed: detalle?.estado === 'entregado', time: '' },
          ],
        });
        this.isLoading.set(false);
      },
      error: (err: unknown) => {
        this.error.set((err as Error).message ?? 'No se encontró la orden');
        this.isLoading.set(false);
        this.orderData.set(null);
      }
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}
