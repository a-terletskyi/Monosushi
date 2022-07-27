import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthorizated = true;
  constructor() { }

  ngOnInit(): void {
  }

  toggleClassActive(element: HTMLElement): void {
    element.classList.toggle('active');
  }

  openPopup(): void {
    // встановити звязок з іншою компонентою (Pop up) та toggle її клас active
  }
}
