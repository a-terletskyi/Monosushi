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

  formModal: any;
  kindOfPopUp!: string;
  windowWidth!: number;

  isAuthorizated = true;

  constructor() { }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(document.getElementById('myModal'));
    this.windowWidth = window.innerWidth;
  }

  onResize(event: any): void { this.windowWidth = event.target.innerWidth }

  get width(): number {
    return this.windowWidth = window.innerWidth;
  }

  toggleClassActive(element: HTMLElement): void { element.classList.toggle('active') }


  // modal
  openModal(kindOf: string): void {
    this.popUp.kindOfPopUp = kindOf;
    this.formModal.show();
  }

  closeModal(): void {
    // confirm or save something
    this.formModal.hide();
  }
}
