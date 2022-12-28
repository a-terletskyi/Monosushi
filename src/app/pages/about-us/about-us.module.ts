import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { AboutUsRoutingModule } from "./about-us-routing.module";
import { AboutUsComponent } from "./about-us.component";
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    SharedModule,
    AboutUsRoutingModule,
    SwiperModule
  ]
})
export class AboutUsModule { }
