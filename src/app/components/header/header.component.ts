import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category';
import { IProductResponse } from 'src/app/shared/interfaces/product/product';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
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
  isAuthorization = false;
  dialogActive = false;
  isLoginRole = '';

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private accountService: AccountService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBasket();
    this.updateBasket();
    this.checkAuthStatus();
    this.checkUpdatesAuthStatus();
  }

  loadCategories(): void { this.categoryService.getAll().subscribe(data => { this.headerCategories = data }) }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basketProducts = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getTotalCount();
  }

  updateBasket(): void { this.orderService.changeBasket.subscribe(() => { this.loadBasket() }) }

  getTotalPrice(): void { this.totalPrice = this.basketProducts.reduce((total: number, prod: IProductResponse) => total + prod.price * prod.count, 0) }

  getTotalCount(): void { this.totalCount = this.basketProducts.reduce((total: number, prod: IProductResponse) => total + prod.count, 0) }

  checkAuthStatus(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.USER) {
      this.isAuthorization = true;
      this.isLoginRole = currentUser.role;
    }
    else if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isAuthorization = true;
      this.isLoginRole = currentUser.role;
    } else {
      this.isAuthorization = false;
      this.isLoginRole = '';
    }
  }

  checkUpdatesAuthStatus(): void { this.accountService.isAuthorization.subscribe(() => this.checkAuthStatus()) }

  logOut(): void { this.accountService.logOut() }

  openAuthDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      width: '100%',
      maxWidth: '600px',
      backdropClass: 'back-color',
      panelClass: 'auth-dialog',
      autoFocus: false
    })
  }

  openCallDialog(): void {
    this.dialog.open(CallDialogComponent, {
      width: '100%',
      maxWidth: '600px',
      backdropClass: 'back-color',
      panelClass: 'call-dialog',
      autoFocus: false
    })
  }

  openBasketDialog(): void {
    this.dialogActive = true;
    const dialogRef = this.dialog.open(BasketDialogComponent, {
      backdropClass: 'basket-backdrop',
      panelClass: 'basket-dialog',
      autoFocus: false,
      data: { status: this.dialogActive }
    });
    dialogRef.afterClosed().subscribe(() => { this.dialogActive = false })
  }

}
