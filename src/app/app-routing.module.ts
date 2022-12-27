import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

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

import { ProductResolver } from './shared/resolvers/product/product.resolver';
import { DiscountResolver } from './shared/resolvers/discount/discount.resolver';
import { AdminGuard } from './shared/guards/auth/admin/admin.guard';
import { UserGuard } from './shared/guards/auth/user/user.guard';
import { AdminAuthComponent } from './pages/admin-auth/admin-auth.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:category', component: ProductInfoComponent },
  { path: 'product/:category/:id', component: ProductComponent, resolve: { product: ProductResolver} },
  { path: 'discount', component: DiscountComponent },
  { path: 'discount/:id', component: DiscountInfoComponent, resolve: { discount: DiscountResolver} },
  { path: 'delivery-payment', component: DeliveryPaymentComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'oferta', component: OfertaComponent },
  {path: 'cabinet', component: CabinetComponent, canActivate: [UserGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'personal-data' },
      { path: 'personal-data', component: CabinetPersonalComponent },
      { path: 'history', component: CabinetHistoryComponent },
      { path: 'password', component: CabinetPasswordComponent },
    ]},
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {path: 'admin-auth', component: AdminAuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
