import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {
  kindOfPopUp: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  openModal(kindOf: string): void { this.kindOfPopUp = kindOf }
}

