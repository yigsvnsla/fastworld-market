import { HttpErrorResponse } from '@angular/common/http';
import { selectorProductError } from './../core/selectors/product.selectors';
import { selectorProduct, selectorProductLoading } from '../core/selectors/product.selectors';
import { actionLoadProduct } from './../core/actions/product.action';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper, { Navigation, Pagination, SwiperOptions } from 'swiper';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  public productLoading$: Observable<boolean> = new Observable()
  public productError$: Observable<HttpErrorResponse | null > = new Observable()


  public fakeData = of([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

  public url?: string;

  public swiper = new Swiper('.swiper', {
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    init: false,
    modules: [Navigation, Pagination],
    allowTouchMove: true,
    on: {
      init: (swiper) => { },
    }
  })


  constructor(
    private location: Location,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.productLoading$ = this.store.select(selectorProductLoading)
    this.productError$ = this.store.select(selectorProductError)

    this.store.dispatch(actionLoadProduct())



    // setTimeout(() => {
    //   this.url = 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71b73jZMqUL._AC_SL1500_.jpg'
    // }, 1500)
  }

  ionViewDidEnter() {
    // @ts-ignore
    this.swiper.init(document.querySelector('.swiper'))
  }

  public onBack() {
    this.location.back()
  }

  public get desc() {
    let x = `PLACA ASUS OPERATIVA

    PROCESADOR AMD FX OPERATIVO

    COOLER

    SE ENTREGA PROBADO

    WHASPP [hidden information]`
    return x
  }
}
