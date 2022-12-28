import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { OfertaRoutingModule } from "./oferta-routing.module";
import { OfertaComponent } from "./oferta.component";

@NgModule({
  declarations: [
    OfertaComponent
  ],
  imports: [
    SharedModule,
    OfertaRoutingModule
  ]
})
export class OfertaModule { }
