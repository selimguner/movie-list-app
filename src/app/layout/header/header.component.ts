import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLightTheme: boolean = false;
  constructor(private theme: ThemeService) { }

  ngOnInit(): void {
    this.theme.getLightTheme().subscribe(res => { this.isLightTheme = res; });
  }

  changeTheme() {
    this.theme.setLightTheme(!this.isLightTheme);
  }

}
