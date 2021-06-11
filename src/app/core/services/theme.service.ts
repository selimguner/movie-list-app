import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isLightTheme: BehaviorSubject<boolean>;

  constructor() {
    this.isLightTheme = new BehaviorSubject<boolean>(
      localStorage.getItem('isLightTheme') === 'true'
    );
  }

  setLightTheme(isLightTheme: boolean) {
    this.isLightTheme.next(isLightTheme);
    localStorage.setItem('isLightTheme', this.isLightTheme.value.toString());
  }

  getLightTheme(): Observable<boolean> {
    return this.isLightTheme;
  }
}