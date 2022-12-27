import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { SwiperModule } from 'swiper/angular';
import { CardsComponent } from './components/cards/cards.component';
import { CategoriesTabsComponent } from './components/categories-tabs/categories-tabs.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { ProductComponent } from './pages/product/product.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { OfertaComponent } from './pages/oferta/oferta.component';

import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { CabinetPersonalComponent } from './pages/cabinet/cabinet-personal/cabinet-personal.component';
import { CabinetHistoryComponent } from './pages/cabinet/cabinet-history/cabinet-history.component';
import { CabinetPasswordComponent } from './pages/cabinet/cabinet-password/cabinet-password.component';

import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { CallDialogComponent } from './components/call-dialog/call-dialog.component';
import { BasketDialogComponent } from './components/basket-dialog/basket-dialog.component';
import { AdminAuthComponent } from './pages/admin-auth/admin-auth.component';

import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CategoriesTabsComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductInfoComponent,
    ProductComponent,
    DiscountComponent,
    DiscountInfoComponent,
    DeliveryPaymentComponent,
    AboutUsComponent,
    OfertaComponent,
    CabinetComponent,
    CabinetPersonalComponent,
    CabinetHistoryComponent,
    CabinetPasswordComponent,
    AuthDialogComponent,
    CallDialogComponent,
    BasketDialogComponent,
    AdminAuthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    SwiperModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
