import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private theme: ThemeService) { }

  ngOnInit(): void {

  }


  changeTheme() {
    this.theme.setLightTheme(true);
  }

}
