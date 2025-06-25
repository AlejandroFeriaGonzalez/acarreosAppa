import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Calculator, ArrowLeft, Wind, Package, Clock, Shield, LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

interface AddOn {
  name: string;
  cost: number;
}

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './quote.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Quote {
  readonly Calculator = Calculator;
  readonly ArrowLeft = ArrowLeft;
  readonly Wind = Wind;
  readonly Package = Package;
  readonly Clock = Clock;
  readonly Shield = Shield;

  quoteForm: FormGroup;
  quote = signal<any>(null);

  constructor(private fb: FormBuilder) {
    this.quoteForm = this.fb.group({
      fromNation: ['', Validators.required],
      toNation: ['', Validators.required],
      distance: ['', Validators.required],
      serviceType: ['', Validators.required],
      packageSize: ['', Validators.required],
      weight: [''],
      expressDelivery: [false],
      insurance: [false],
      fragileItems: [false]
    });
  }

  calculateQuote() {
    if (this.quoteForm.valid) {
      const quoteData = this.quoteForm.value;

      const baseRates = {
        residential: 100,
        commercial: 200,
        express: 150,
        bulk: 300,
      };

      const distanceMultipliers = {
        short: 1,
        medium: 1.5,
        long: 2.5,
        intercontinental: 4,
      };

      const sizeMultipliers = {
        small: 1,
        medium: 1.5,
        large: 2,
        commercial: 3,
      };

      const baseRate = baseRates[quoteData.serviceType as keyof typeof baseRates] || 100;
      const distanceMultiplier = distanceMultipliers[quoteData.distance as keyof typeof distanceMultipliers] || 1;
      const sizeMultiplier = sizeMultipliers[quoteData.packageSize as keyof typeof sizeMultipliers] || 1;

      let totalCost = baseRate * distanceMultiplier * sizeMultiplier;

      if (quoteData.weight) {
        totalCost += Number.parseInt(quoteData.weight) * 2;
      }

      const addOns: AddOn[] = [];
      if (quoteData.expressDelivery) {
        totalCost *= 1.5;
        addOns.push({ name: "Express Delivery", cost: totalCost * 0.33 });
      }
      if (quoteData.insurance) {
        const insuranceCost = totalCost * 0.2;
        totalCost += insuranceCost;
        addOns.push({ name: "Full Coverage Insurance", cost: insuranceCost });
      }
      if (quoteData.fragileItems) {
        const fragileCost = 50;
        totalCost += fragileCost;
        addOns.push({ name: "Fragile Item Handling", cost: fragileCost });
      }

      this.quote.set({
        baseRate,
        totalCost: Math.round(totalCost),
        addOns,
        estimatedDays: quoteData.expressDelivery ? "1-2 days" : "3-5 days",
        bisonRecommendation: this.getBisonRecommendation(quoteData),
      });
    }
  }

  getBisonRecommendation(quoteData: any): string {
    if (quoteData.serviceType === "express") return "Nimbus (Express Specialist)";
    if (quoteData.fragileItems) return "Cloudy (Fragile Items Expert)";
    if (quoteData.packageSize === "commercial") return "Thunder (Heavy Cargo)";
    return "Appa Jr. (All-Purpose)";
  }

  onSubmit() {
    this.calculateQuote();
  }

  resetQuote() {
    this.quote.set(null);
    this.quoteForm.reset();
  }
}
