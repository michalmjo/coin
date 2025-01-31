import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { UserCredentials } from './services/user-credentials';
import { NotificationService } from '../shared/components/services/notification.service';
import { UserInfo } from './services/user-info';
import { Router } from '@angular/router';

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
export class LoginComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>(); // Wyemitowanie zdarzenia do zamknięcia okna

  loginForm!: FormGroup;
  submitted = false;
  isLoginMode = true;
  openDialog = false;
  isLoading = false;
  error: string = '';

  notifications: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.notificationService.getNotifications().subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.toggleBodyScroll(true);
  }
  removeNotification(index: any) {
    this.notificationService.removeNotification(index);
  }

  ngOnDestroy(): void {
    // Przy zamknięciu okna logowania, odblokuj przewijanie
    this.toggleBodyScroll(false);
  }

  toggleBodyScroll(isOpen: boolean): void {
    if (isOpen) {
      // Blokujemy przewijanie
      document.body.style.overflow = 'hidden';
      // Dodajemy klasę dla efektu rozmycia tła
      document.body.classList.add('modal-open');
    } else {
      // Odblokowujemy przewijanie
      document.body.style.overflow = 'auto';
      // Usuwamy klasę rozmycia tła
      document.body.classList.remove('modal-open');
    }
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
    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    let authObs: Observable<UserInfo>;

    if (this.loginForm.valid) {
      if (this.isLoginMode) {
        authObs = this.authService.login(email, password);
      } else {
        authObs = this.authService.register(email, password);
      }

      authObs.subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/home']);
          this.closeDialog();
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.notificationService.addNotification(errorMessage);
          this.isLoading = false;
        }
      );
    }

    console.log('Form Data:', this.loginForm.value);
  }

  closeDialog(): void {
    this.close.emit();
    this.openDialog = false;
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
