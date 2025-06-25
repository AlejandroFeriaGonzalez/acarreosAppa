import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from "../../shared/components/button/button";
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Wind } from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [Button, RouterModule, LucideAngularModule],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  readonly Wind = Wind;
}
