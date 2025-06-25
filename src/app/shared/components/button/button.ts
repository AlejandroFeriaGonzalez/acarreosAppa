import { ChangeDetectionStrategy, Component, EventEmitter, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Button {
  label = input<string>('Button');
  type = input<'primary' | 'secondary'>('primary');
  clicked = output<void>();

  onClick() {
    this.clicked.emit();
  }
}
