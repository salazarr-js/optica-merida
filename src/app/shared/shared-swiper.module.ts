import { NgModule } from '@angular/core';
import {
  SwiperModule,
  SWIPER_CONFIG,
  SwiperConfigInterface
} from 'ngx-swiper-wrapper';

/** SWIPER DEFAULT CONFIGURATION */
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  spaceBetween: 16,
  scrollbar: false,
  navigation: true,
  mousewheel: false,
  allowTouchMove: true,
  // autoplay: {
  //   delay: 10000,
  //   disableOnInteraction: true,
  // },
  pagination: true,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  }
};

/** SHARED FEATURE SWIPER MODULE */
@NgModule({
  declarations: [],
  imports: [ SwiperModule ],
  providers: [
    { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG }
  ],
  exports: [ SwiperModule ]
})
export class SharedSwiperModule { }
