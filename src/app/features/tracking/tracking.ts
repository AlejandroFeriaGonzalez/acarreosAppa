import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Wind, ArrowLeft, Search, MapPin, Clock, CheckCircle, Truck } from 'lucide-angular';

interface TimelineStep {
  status: string;
  completed: boolean;
  time: string;
  active?: boolean;
}

interface OrderData {
  id: string;
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
export class Tracking {
  readonly Wind = Wind;
  readonly ArrowLeft = ArrowLeft;
  readonly Search = Search;
  readonly MapPin = MapPin;
  readonly Clock = Clock;
  readonly CheckCircle = CheckCircle;
  readonly Truck = Truck;

  trackingIdControl = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  orderData = signal<OrderData | null>(null);
  isLoading = signal(false);

  handleTrack(e: Event): void {
    e.preventDefault();
    if (this.trackingIdControl.invalid) {
      return;
    }

    this.isLoading.set(true);
    const trackingId = this.trackingIdControl.value;

    // Simulate API call
    setTimeout(() => {
      this.orderData.set({
        id: trackingId,
        status: 'En camino',
        from: 'Ba Sing Se, Reino Tierra',
        to: 'Ciudad republica, Republica Unida',
        bisonName: 'Appa Jr.',
        caretaker: 'Maestro Jinora',
        estimatedArrival: 'Mañana, 2:30 PM',
        currentLocation: "Volando sobre el Paso de la Serpiente",
        timeline: [
          { status: 'Pedido realizado', completed: true, time: 'Hace 2 días' },
          { status: 'Bisonte asignado', completed: true, time: 'Hace un día' },
          { status: 'Recogida completada', completed: true, time: 'Hace 12 horas' },
          { status: 'En camino', completed: true, time: 'Current', active: true },
          { status: 'Fuera de entrega', completed: false, time: 'Mañana' },
          { status: 'Entregado', completed: false, time: 'Mañana' },
        ],
      });
      this.isLoading.set(false);
    }, 1000);
  }
}
