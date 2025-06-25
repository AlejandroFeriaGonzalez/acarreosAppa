import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Card {
  title = input.required<string>();
  description = input.required<string>();
  icon = input.required<LucideIconData>();
  color = input<string>('blue');
}
