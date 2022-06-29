import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product-category/:category', component: ProductCategoryComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'actions', component: ActionsComponent },
  { path: 'actions/:id', component: ActionDetailsComponent },
  { path: 'dostavka-ta-oplata', component: DeliveryPaymentComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'dogovir-oferta', component: OfertaComponent },
  { path: 'checkout', component: CheckoutComponent },
  {path: 'kabinet', component: CabinetComponent, children: [
      { path: '', component: CabinetPersonalComponent },
      { path: 'history', component: CabinetHistoryComponent },
      { path: 'password', component: CabinetPasswordComponent },
    ]},
  {path: 'admin', component: AdminComponent, children: [
      { path: 'action', component: AdminActionComponent },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'order', component: AdminOrderComponent },
      { path: '', pathMatch: 'full', redirectTo: 'action' }
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
