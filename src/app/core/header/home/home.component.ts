import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CryptoInfoService } from '../services/crypto-info.service';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'price',
    'marketcap',
    'volumen',
    'supply',
  ];

  loading = false;

  CryptoData: any[] = [];

  dataSource = new MatTableDataSource<any>(this.CryptoData);

  constructor(private cryptoInfoService: CryptoInfoService) {}
  ngOnInit() {
    this.loading = true;
    // Subskrypcja na odpowiedź serwisu i przypisanie danych do tabeli
    this.cryptoInfoService
      .getlistCrypto()
      .pipe(
        tap((x) => {
          console.log(x);
          this.CryptoData = x;
          this.dataSource.data = x; // Przypisanie danych do dataSource
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
    // this.dataSource.data = ELEMENT_DATA;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
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
