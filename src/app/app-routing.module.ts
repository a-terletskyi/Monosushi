import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import { AdminGuard } from './shared/guards/auth/admin/admin.guard';
import { UserGuard } from './shared/guards/auth/user/user.guard';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'cabinet',
    canActivate: [UserGuard],
    loadChildren: () => import('./pages/cabinet/cabinet.module').then(m => m.CabinetModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'product/:category',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
  },
  {
    path: 'discount',
    loadChildren: () => import('./pages/discount/discount.module').then(m => m.DiscountModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: 'delivery-payment',
    loadChildren: () => import('./pages/delivery-payment/delivery-payment.module').then(m => m.DeliveryPaymentModule)
  },
  {
    path: 'oferta',
    loadChildren: () => import('./pages/oferta/oferta.module').then(m => m.OfertaModule)
  },
  {
    path: 'admin-auth',
    loadChildren: () => import('./pages/admin-auth/admin-auth.module').then(m => m.AdminAuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
