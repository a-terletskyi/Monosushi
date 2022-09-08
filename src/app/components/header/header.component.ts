import { Component, OnInit, ViewChild } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/categories/categories';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import { PopUpComponent } from '../pop-up/pop-up.component';

declare let window: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  headerCategories!: ICategoryResponse[];
  isAuthorizated = false;
  @ViewChild(PopUpComponent) popUpComponent!: PopUpComponent;
  currentPopUp!: any;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.currentPopUp = new window.bootstrap.Modal(document.getElementById('myModal'));
  }

  loadCategories(): void { this.categoriesService.getAll().subscribe(data => { this.headerCategories = data }) }

  toggleClassActive(element: HTMLElement): void { element.classList.toggle('active') }

  openPopUpByName(name: string): void {
    this.popUpComponent.popUpName = name;
    this.currentPopUp.show();
  }

}
