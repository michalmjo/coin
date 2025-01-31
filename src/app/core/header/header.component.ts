import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedImplementationService } from 'src/app/service/shared-implementation.service';
import { CryptoInfoService } from './services/crypto-info.service';
import { AuthService } from '../login/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loginMode = true;
  openDialog = false;
  currentTheme: string = 'light';

  userSub?: Subscription;

  constructor(
    private sharedImplementsService: SharedImplementationService,
    private cryptoInfoService: CryptoInfoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentTheme = this.sharedImplementsService.getSavedTheme();
    this.cryptoInfoService.getlistCrypto();
    this.userSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.loginMode = false;
      }
    });
  }
  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  userMode() {
    if (this.loginMode) {
      this.openDialog = true;
    } else {
      console.log('Wylogowany');
      this.authService.logout();
      this.openDialog = false;
      this.loginMode = true;
    }
  }
  closeLoginDialog() {
    this.openDialog = false; // 🔹 Zamykamy dialog
  }
  changeTheme(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Rzutowanie na HTMLSelectElement
    const theme = selectElement.value;
    this.sharedImplementsService.changeTheme(theme);
    this.currentTheme = theme;
  }
}
