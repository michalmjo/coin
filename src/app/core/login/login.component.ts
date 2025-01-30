import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('dialogHeight', [
      state('login', style({ height: '300px' })), // Wysokość dla login
      state('register', style({ height: '400px' })), // Wysokość dla register
      transition('login <=> register', [
        animate('0.3s ease-in-out'), // Płynna animacja
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  @Output() close = new EventEmitter<void>(); // Wyemitowanie zdarzenia do zamknięcia okna

  loginForm!: FormGroup;
  submitted = false;
  isLoginMode = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl(''), // To pole nie jest wymagane dla loginu, ale dla rejestracji tak
    });
  }

  // Getter do łatwiejszego dostępu do pól formularza
  get f() {
    return this.loginForm.controls as {
      email: FormControl;
      password: FormControl;
      confirmPassword: FormControl;
    };
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    console.log('Form Data:', this.loginForm.value);
  }

  closeDialog(): void {
    this.close.emit(); // Emitowanie zdarzenia zamykającego
  }

  switchMode(isLogin: boolean): void {
    this.isLoginMode = isLogin;

    if (isLogin) {
      this.loginForm.removeControl('confirmPassword');
    } else {
      this.loginForm.addControl(
        'confirmPassword',
        new FormControl('', Validators.required)
      );
    }
  }
}
