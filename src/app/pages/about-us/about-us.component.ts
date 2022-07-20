import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, SwiperOptions } from 'swiper';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    breakpoints: {
      576: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1500: { slidesPerView: 4 },
    },
    speed: 700
  };

  readMoreStatus = false;

  constructor() { }

  ngOnInit(): void {
    SwiperCore.use([Navigation, Pagination, Scrollbar]);
  }

  toggleClassActive(element: HTMLElement): void {
    element.classList.toggle('active');
    this.readMoreStatus ? this.readMoreStatus = false : this.readMoreStatus = true;
    // добавити типу якщо клік був не на менюшці закривати його
  }
}
