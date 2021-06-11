import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isLightTheme: boolean = false;
  constructor(private theme: ThemeService) {

  }

  ngOnInit(): void {
    this.theme.getLightTheme().subscribe(res => { this.isLightTheme = res; });
  }

}
