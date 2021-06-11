import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'movie-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private theme: ThemeService, @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.theme.getLightTheme().subscribe(res => {
      if (res) {
        this.document.body.classList.add('light');
      } else {
        this.document.body.classList.remove('light');
      }
    });
  }
}
