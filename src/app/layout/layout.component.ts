import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  poster: string = '';

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.getBackground().subscribe(res => this.poster = res)
  }

}
