import { Component, OnInit, ViewChild } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/categories/categories';
import { IProductResponse } from 'src/app/shared/interfaces/product/product';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { PopUpComponent } from '../pop-up/pop-up.component';

declare let window: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  headerCategories!: ICategoryResponse[];
  private basket: IProductResponse[] = [];
  totalPrice = 0;
  isAuthorizated = false;
  @ViewChild(PopUpComponent) popUpComponent!: PopUpComponent;
  currentPopUp!: any;

  constructor(
    private categoriesService: CategoriesService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBasket();
    this.updateBasket();
    this.currentPopUp = new window.bootstrap.Modal(document.getElementById('myModal'));
  }

  loadCategories(): void { this.categoriesService.getAll().subscribe(data => { this.headerCategories = data }) }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void { this.totalPrice = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.price * prod.count, 0) }

  updateBasket(): void {this.orderService.changeBasket.subscribe(() => { this.loadBasket() })}

  toggleClassActive(element: HTMLElement): void { element.classList.toggle('active') }

  openPopUpByName(name: string): void {
    this.popUpComponent.popUpName = name;
    this.currentPopUp.show();
  }

}
