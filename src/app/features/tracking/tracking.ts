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
        status: 'in_transit',
        from: 'Ba Sing Se, Earth Kingdom',
        to: 'Republic City, United Republic',
        bisonName: 'Appa Jr.',
        caretaker: 'Master Jinora',
        estimatedArrival: 'Tomorrow, 2:30 PM',
        currentLocation: "Flying over Serpent's Pass",
        timeline: [
          { status: 'Order Placed', completed: true, time: '2 days ago' },
          { status: 'Bison Assigned', completed: true, time: '1 day ago' },
          { status: 'Pickup Completed', completed: true, time: '12 hours ago' },
          { status: 'In Transit', completed: true, time: 'Current', active: true },
          { status: 'Out for Delivery', completed: false, time: 'Tomorrow' },
          { status: 'Delivered', completed: false, time: 'Tomorrow' },
        ],
      });
      this.isLoading.set(false);
    }, 1000);
  }
}
