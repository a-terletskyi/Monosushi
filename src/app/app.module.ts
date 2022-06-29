import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { ActionsComponent } from './admin/actions/actions.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ProductsComponent } from './admin/products/products.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { DostavkaTaOplataComponent } from './pages/dostavka-ta-oplata/dostavka-ta-oplata.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ActionDetailsComponent } from './pages/action-details/action-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { KabinetComponent } from './pages/kabinet/kabinet.component';
import { PersonalDataComponent } from './pages/kabinet/personal-data/personal-data.component';
import { HistoryComponent } from './pages/kabinet/history/history.component';
import { PasswordComponent } from './pages/kabinet/password/password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    ActionsComponent,
    CategoriesComponent,
    ProductsComponent,
    OrdersComponent,
    HomeComponent,
    ProductComponent,
    ProductCategoryComponent,
    DostavkaTaOplataComponent,
    AboutUsComponent,
    ActionDetailsComponent,
    CheckoutComponent,
    KabinetComponent,
    PersonalDataComponent,
    HistoryComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
