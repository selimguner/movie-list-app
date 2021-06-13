import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private isLightTheme: BehaviorSubject<boolean>;
  private background: BehaviorSubject<string>;

  constructor() {
    this.isLightTheme = new BehaviorSubject<boolean>(
      localStorage.getItem('isLightTheme') === 'true'
    );
    this.background = new BehaviorSubject<string>('');
  }

  setLightTheme(isLightTheme: boolean) {
    this.isLightTheme.next(isLightTheme);
    localStorage.setItem('isLightTheme', this.isLightTheme.value.toString())
  }

  getLightTheme(): Observable<boolean> {
    return this.isLightTheme
  }

  changeBackground(poster: string) {
    this.background.next(poster);
  }

  getBackground(): Observable<string> {
    return this.background;
  }
}