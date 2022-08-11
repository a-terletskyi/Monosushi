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
  @ViewChild(PopUpComponent) popUp!: PopUpComponent;
  categories!: ICategoryResponse[];
  kindOfPopUp!: string;
  myModal!: any;
  isAuthorizated = false;

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategoriesAll();
    this.myModal = new window.bootstrap.Modal(document.getElementById('myModal'));
  }

  getCategoriesAll(): void { this.categoryService.getAll().subscribe(data => { this.categories = data }) }

  toggleClassActive(element: HTMLElement): void { element.classList.toggle('active') }

  openModal(kindOf: string): void {
    this.popUp.kindOfPopUp = kindOf;
    this.myModal.show();
  }
}
