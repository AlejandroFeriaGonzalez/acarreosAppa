import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { LucideAngularModule, Wind, ArrowLeft } from 'lucide-angular';
import { RouterModule, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LucideAngularModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login implements OnInit {
  readonly Wind = Wind;
  readonly ArrowLeft = ArrowLeft;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  private router = inject(Router);

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form submitted', this.loginForm.value);
      // Handle login logic here (e.g., API call)
    } else {
      // Mark all fields as touched to display errors
      Object.values(this.loginForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
  // ir a /home
  goToHome(): void {
    this.router.navigate(['/home']);
  }

  // ir a /admin
  goToAdmin(): void {
    this.router.navigate(['/admin']);
  }
}
