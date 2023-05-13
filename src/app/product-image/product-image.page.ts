import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import Swiper, { History, Pagination, Thumbs, Zoom } from 'swiper';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.page.html',
  styleUrls: ['./product-image.page.scss'],
})
export class ProductImagePage implements OnInit {

  public fakeData = of([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

  public swiper2 = new Swiper('.swiper-2', {
    watchSlidesProgress: true,
    spaceBetween: 16,
    slidesPerView: 'auto',
    init: false,
    on: {
      // init: (swiper) =>console.log( '2--->'),
    }
  })

  public swiper1 = new Swiper('.swiper-1', {
    // initialSlide: this.activatedRoute.snapshot.params['id'] - 1,
    zoom: true,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    init: false,
    modules: [Pagination, Zoom, Thumbs,],
    on: {
      // init:(swp)=>{console.log('dasdsa')},
    },
    thumbs: {
      swiper: this.swiper2,
    },
  })


  // afterInit: (swiper) => {
  //   swiper.on('activeIndexChange', (swiper) => {
  //     this.location.replaceState(`${this.location.path().slice(0, -1)}${swiper.activeIndex + 1}`)
  //   })
  // },

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) {


  }

  ngOnInit() {



  }

  ionViewDidEnter() {
    // @ts-ignore
    this.swiper2.init(document.querySelector('.swiper-2'))
    // @ts-ignore
    this.swiper1.init(document.querySelector('.swiper-1'))


  }

  ngOnDestroy() {
  }
}
