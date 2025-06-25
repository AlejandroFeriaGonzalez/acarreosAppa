import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from "../../shared/components/button/button";
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Wind, Waves, Flame, Mountain, Star, Users, Package } from 'lucide-angular';
import { Card } from '../../shared/components/card/card';

@Component({
  selector: 'app-home',
  imports: [Button, RouterModule, LucideAngularModule, Card],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  readonly Wind = Wind;
  readonly Waves = Waves;
  readonly Flame = Flame;
  readonly Mountain = Mountain;
  readonly Star = Star;
  readonly Users = Users;
  readonly Package = Package;
}
