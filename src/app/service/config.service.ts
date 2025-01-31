// src/app/services/config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  // Funkcja do załadowania pliku konfiguracyjnego
  loadConfig(): Observable<any> {
    return this.http.get('assets/config.json');
  }

  // Funkcja, aby pobrać token po załadowaniu pliku
  get apiKey(): string {
    if (!this.config) {
      throw new Error('Config is not loaded');
    }
    return this.config.apiKey;
  }

  // Metoda do ustawienia konfiguracji (opcjonalnie)
  setConfig(config: any): void {
    this.config = config;
  }
}
