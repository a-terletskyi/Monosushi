import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {
  popUpName = '';

  constructor() { }

  ngOnInit(): void {}

  openModalByName(name: string): void { this.popUpName = name }
  
}

