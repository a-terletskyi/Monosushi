import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ProductInfoComponent } from "./product-info/product-info.component";
import { ProductComponent } from "./product.component";
import { ProductResolver } from "../../shared/resolvers/product/product.resolver";

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: ':id', component: ProductInfoComponent, resolve: { product: ProductResolver }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
