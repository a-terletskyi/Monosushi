import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { ICategoryResponse } from 'src/app/shared/interfaces/categories/categories';
import { IProductResponse } from 'src/app/shared/interfaces/product/product';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';
import { CallDialogComponent } from '../call-dialog/call-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  headerCategories!: ICategoryResponse[];
  basketProducts: IProductResponse[] = [];
  totalPrice = 0;
  totalCount = 0;
  isAuthorizated = false;
  isLoginRole = '';

  constructor(
    private categoriesService: CategoriesService,
    private orderService: OrderService,
    private accountService: AccountService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBasket();
    this.updateBasket();
    this.checkAuthStatus();
    this.checkUpdatesAuthStatus();
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

  addToBasket(product: IProductResponse): void { this.orderService.add(product) }

  deleteToBasket(product: IProductResponse): void { this.orderService.delete(product) }

  updateBasket(): void { this.orderService.changeBasket.subscribe(() => { this.loadBasket() }) }

  productCount(product: IProductResponse, status: boolean): void {
    if (status) {
      ++product.count;
      this.orderService.add(product);
    } else if (!status && product.count > 1) {
      --product.count;
      this.orderService.add(product);
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

  logOut(): void { this.accountService.logOut() }

  openAuthDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      width: '100%',
      maxWidth: '600px',
      backdropClass: 'back-color',
      panelClass: 'auth-dialog',
    })
  }

  openCallDialog(): void {
    this.dialog.open(CallDialogComponent, {
      backdropClass: 'back-color',
      panelClass: 'call-dialog'
    })
  }

  openBasketDialog(): void {
    this.dialog.open(BasketDialogComponent, {
      backdropClass: 'back-color',
      panelClass: 'basket-dialog'
    })
  }

}
