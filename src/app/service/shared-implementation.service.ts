import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedImplementationService {
  private readonly themeKey = 'theme'; // Klucz w localStorage

  currentTheme: string = 'light'; // Domyślny motyw

  constructor() {}

  // Zmieniamy motyw i zapisujemy go w localStorage
  changeTheme(theme: string): void {
    // Zapisz motyw w localStorage
    localStorage.setItem(this.themeKey, theme);

    // Zastosuj motyw w document.documentElement
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Pobierz motyw z localStorage
  getSavedTheme(): string {
    return localStorage.getItem(this.themeKey)!;
  }

  // Inicjalizowanie motywu przy starcie aplikacji
  initializeTheme(): void {
    const savedTheme = this.getSavedTheme();

    if (savedTheme) {
      this.changeTheme(savedTheme); // Jeśli jest zapisany motyw, użyj go
    } else {
      this.setThemeFromPreferences(); // Jeśli nie ma zapisanego motywu, ustaw na podstawie preferencji
    }
  }

  // Ustawienie motywu na podstawie preferencji systemowych
  setThemeFromPreferences(): void {
    const prefersDarkScheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    this.currentTheme = prefersDarkScheme ? 'dark' : 'light';
    this.changeTheme(this.currentTheme); // Zastosuj motyw
  }
}
