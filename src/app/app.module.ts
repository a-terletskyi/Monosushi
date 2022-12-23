import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { SwiperModule } from 'swiper/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardsComponent } from './components/cards/cards.component';
import { CategoriesTabsComponent } from './components/categories-tabs/categories-tabs.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { ProductComponent } from './pages/product/product.component';
import { ActionsComponent } from './pages/actions/actions.component';
import { ActionDetailsComponent } from './pages/action-details/action-details.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { OfertaComponent } from './pages/oferta/oferta.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { CabinetPersonalComponent } from './pages/cabinet/cabinet-personal/cabinet-personal.component';
import { CabinetHistoryComponent } from './pages/cabinet/cabinet-history/cabinet-history.component';
import { CabinetPasswordComponent } from './pages/cabinet/cabinet-password/cabinet-password.component';

import { AdminComponent } from './admin/admin.component';
import { AdminActionComponent } from './admin/admin-action/admin-action.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminAuthComponent } from './pages/admin-auth/admin-auth.component';

import { SharedModule } from './shared/shared.module';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { CallDialogComponent } from './components/call-dialog/call-dialog.component';
import { BasketDialogComponent } from './components/basket-dialog/basket-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CategoriesTabsComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductCategoryComponent,
    ProductComponent,
    ActionsComponent,
    ActionDetailsComponent,
    DeliveryPaymentComponent,
    AboutUsComponent,
    OfertaComponent,
    CheckoutComponent,
    CabinetComponent,
    CabinetPersonalComponent,
    CabinetHistoryComponent,
    CabinetPasswordComponent,
    AdminComponent,
    AdminActionComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminOrderComponent,
    AdminAuthComponent,
    AuthDialogComponent,
    CallDialogComponent,
    BasketDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SwiperModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
