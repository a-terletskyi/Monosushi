import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { ICategoryResponse } from 'src/app/shared/interfaces/categories/categories';
import { IProductResponse } from 'src/app/shared/interfaces/product/product';
import { AccountService } from 'src/app/shared/services/account/account.service';
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
  @ViewChild(PopUpComponent) popUpComponent!: PopUpComponent;
  headerCategories!: ICategoryResponse[];
  basketProducts: IProductResponse[] = [];
  totalPrice = 0;
  totalCount = 0;
  isAuthorizated = false;
  isLoginRole = '';
  currentPopUp!: any;

  constructor(
    private categoriesService: CategoriesService,
    private orderService: OrderService,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBasket();
    this.updateBasket();
    this.checkAuthStatus();
    this.checkUpdatesAuthStatus();
    this.currentPopUp = new window.bootstrap.Modal(document.getElementById('myModal'));
  }

  loadCategories(): void { this.categoriesService.getAll().subscribe(data => { this.headerCategories = data }) }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basketProducts = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getTotalCount();
  }

  getTotalPrice(): void { this.totalPrice = this.basketProducts.reduce((total: number, prod: IProductResponse) => total + prod.price * prod.count, 0) }

  getTotalCount(): void { this.totalCount = this.basketProducts.reduce((total: number, prod: IProductResponse) => total + prod.count, 0) }

  updateBasket(): void { this.orderService.changeBasket.subscribe(() => { this.loadBasket() }) }

  addToBasket(product: IProductResponse): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.orderService.basket = JSON.parse(localStorage.getItem('basket') as string);
      if (this.orderService.basket.some(prod => prod.id === product.id)) {
        const index = this.orderService.basket.findIndex(prod => prod.id === product.id);
        this.orderService.basket[index].count = product.count;
      } else { this.orderService.basket.push(product); }
    } else { this.orderService.basket.push(product); }
    localStorage.setItem('basket', JSON.stringify(this.orderService.basket));
    this.orderService.changeBasket.next(true);
  }

  deleteToBasket(product: IProductResponse): void { this.orderService.delete(product) }

  productCount(product: IProductResponse, status: boolean): void {
    if (status) {
      ++product.count;
      this.addToBasket(product);
    } else if (!status && product.count > 1) {
      --product.count;
      this.addToBasket(product);
    }
  }

  checkAuthStatus(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.USER) {
      this.isAuthorizated = true;
      this.isLoginRole = currentUser.role;
    }
    else if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isAuthorizated = true;
      this.isLoginRole = currentUser.role;
    } else {
      this.isAuthorizated = false;
      this.isLoginRole = '';
    }
  }

  checkUpdatesAuthStatus(): void { this.accountService.isAuthorizated.subscribe(() => this.checkAuthStatus()) }

  logOut(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
    this.accountService.isAuthorizated.next(false);
  }

  toggleClassActive(element: HTMLElement): void { element.classList.toggle('active') }

  openPopUpByName(name: string): void {
    this.popUpComponent.popUpName = name;
    this.currentPopUp.show();
  }
}
