import { Component, OnInit } from '@angular/core';
import { SharedImplementationService } from 'src/app/service/shared-implementation.service';
import { CryptoInfoService } from './services/crypto-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentTheme: string = 'light';
  constructor(
    private sharedImplementsService: SharedImplementationService,
    private cryptoInfoService: CryptoInfoService
  ) {}

  ngOnInit() {
    this.currentTheme = this.sharedImplementsService.getSavedTheme();
    this.cryptoInfoService.getlistCrypto();
  }

  changeTheme(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Rzutowanie na HTMLSelectElement
    const theme = selectElement.value;
    this.sharedImplementsService.changeTheme(theme);
    this.currentTheme = theme;
  }
}
