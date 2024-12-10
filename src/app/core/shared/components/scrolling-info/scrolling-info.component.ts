import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { CryptoInfoService } from 'src/app/core/header/services/crypto-info.service';

@Component({
  selector: 'app-scrolling-info',
  templateUrl: './scrolling-info.component.html',
  styleUrls: ['./scrolling-info.component.scss'],
})
export class ScrollingInfoComponent implements OnInit {
  items: any = [];
  constructor(private cryptoInfoService: CryptoInfoService) {}

  ngOnInit(): void {
    this.cryptoInfoService
      .getlistCrypto()
      .pipe(
        map((data) =>
          data.slice(0, 10).map((item: any) => {
            const high24h = item.high_24h || 0;
            const low24h = item.low_24h || 0;
            const difference = ((high24h - low24h) / low24h) * 100;

            return {
              ...item,
              difference: difference.toFixed(2), // Zachowuje 2 miejsca po przecinku
              trendClass: difference >= 0 ? 'trend-up' : 'trend-down', // Zielony lub czerwony
            };
          })
        ),
        tap((x) => {
          console.log(x);
          this.items = x;
        })
      )
      .subscribe();
  }
}
// const ELEMENT_DATA: any[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
//   { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
//   { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
//   { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
//   { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
//   { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
//   { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
//   { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
//   { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
//   { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
//   { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
// ];
