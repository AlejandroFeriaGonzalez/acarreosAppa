import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from "../../shared/components/button/button";

@Component({
  selector: 'app-home',
  imports: [Button],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {

}
