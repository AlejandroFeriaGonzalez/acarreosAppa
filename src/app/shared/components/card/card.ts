import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class Card {
  title = input.required<string>();
  description = input.required<string>();
  icon = input.required<LucideIconData>();
  color = input<string>('blue');
}
