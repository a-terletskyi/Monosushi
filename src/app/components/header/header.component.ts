import { Component, OnInit, ViewChild } from '@angular/core';
import { PopUpComponent } from '../pop-up/pop-up.component';

declare let window: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @ViewChild(PopUpComponent) popUp!: PopUpComponent;
  kindOfPopUp!: string;
  myModal!: any ;
  isAuthorizated = false;
  
  windowWidth!: number;

  constructor() { }

  ngOnInit(): void {
    this.myModal = new window.bootstrap.Modal(document.getElementById('myModal'));
    this.windowWidth = window.innerWidth;
  }

  toggleClassActive(element: HTMLElement): void { element.classList.toggle('active') }
  
  onResize(event: any): void { this.windowWidth = event.target.innerWidth }

  // modal
  openModal(kindOf: string): void {
    this.popUp.kindOfPopUp = kindOf;
    this.myModal.show();
  }

  closeModal(): void {
    // confirm or save something
    this.myModal.hide();
  }
}
