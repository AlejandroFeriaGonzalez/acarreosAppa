import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Package, MapPin, Calendar, ArrowLeft } from 'lucide-angular';
import { OrderService, CreateOrderPayload } from '../../core/services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './order.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Order {
  readonly Package = Package;
  readonly MapPin = MapPin;
  readonly Calendar = Calendar;
  readonly ArrowLeft = ArrowLeft;

  orderForm: FormGroup;
  private orderService = inject(OrderService);
  private fb = inject(FormBuilder);
  readonly submitting = signal(false);
  readonly submitError = signal<string | null>(null);

  constructor() {
    this.orderForm = this.fb.group({
      serviceType: ['', Validators.required],
      fromNation: ['', Validators.required],
      fromCity: ['', Validators.required],
      fromAddress: ['', Validators.required],
      toNation: ['', Validators.required],
      toCity: ['', Validators.required],
      toAddress: ['', Validators.required],
      moveDate: ['', Validators.required],
      packageSize: ['', Validators.required],
      specialItems: [''],
      description: [''],
      expressDelivery: [false],
      insurance: [false]
    });
  }

  onSubmit() {
    if (!this.orderForm.valid) return;
    this.submitting.set(true);
    this.submitError.set(null);
    // Simulación de usuario y bisonte, en app real se obtendrían del contexto
    const payload: CreateOrderPayload = {
      numero_guia: `AP-${Date.now().toString().slice(-6)}`,
      observaciones: this.orderForm.value.description,
      usuarioId: 1, // TODO: obtener usuario real
      bisontelId: 1, // TODO: obtener bisonte real
      items: [
        {
          descripcion: this.orderForm.value.specialItems || 'Mudanza',
          cantidad: 1,
          peso: 10, // TODO: calcular peso real
          prioridad: this.orderForm.value.expressDelivery ? 'alta' : 'normal',
          estado: 'pendiente',
          precio: 100, // TODO: calcular precio real
          origen: `${this.orderForm.value.fromNation}, ${this.orderForm.value.fromCity}, ${this.orderForm.value.fromAddress}`,
          destino: `${this.orderForm.value.toNation}, ${this.orderForm.value.toCity}, ${this.orderForm.value.toAddress}`
        }
      ]
    };
    this.orderService.createOrder(payload).subscribe({
      next: (order) => {
        this.submitting.set(false);
        alert(`¡Orden creada exitosamente! Su número de guía es: ${order.numero_guia}`);
        this.orderForm.reset();
      },
      error: (err) => {
        this.submitting.set(false);
        this.submitError.set(err.message ?? 'Error al crear la orden');
      }
    });
  }
}
