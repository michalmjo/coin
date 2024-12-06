import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CryptoInfoService {
  constructor(private http: HttpClient) {}

  getlistCrypto() {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd
`
    );
  }
}
