import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readMoreStatus = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleClassActive(element: HTMLElement): void {
    element.classList.toggle('active');
    this.readMoreStatus ? this.readMoreStatus = false : this.readMoreStatus = true;
    // добавити типу якщо клік був не на менюшці закривати його
  }

}
