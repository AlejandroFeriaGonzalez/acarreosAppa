import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Package, MapPin, Calendar, ArrowLeft } from 'lucide-angular';

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

  constructor(private fb: FormBuilder) {
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
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      const orderId = `AP-${Date.now().toString().slice(-6)}`;
      console.log("Order data:", orderData);
      alert(`Order placed successfully! Your tracking ID is: ${orderId}`);
    }
  }
}
