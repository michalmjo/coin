import { Component, OnInit } from '@angular/core';
import { SharedImplementationService } from './service/shared-implementation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CoinMarket';

  constructor(
    private sharedImplementationService: SharedImplementationService
  ) {}

  ngOnInit(): void {
    this.sharedImplementationService.initializeTheme();
  }
}
