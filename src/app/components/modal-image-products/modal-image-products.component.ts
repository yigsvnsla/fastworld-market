import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import Swiper, { SwiperOptions } from 'swiper';
import { register } from 'swiper/element';

@Component({
  selector: 'app-modal-image-products',
  templateUrl: './modal-image-products.component.html',
  styleUrls: ['./modal-image-products.component.scss'],
})
export class ModalImageProductsComponent implements OnInit {



  @ViewChild("swiperPrimary",{static:true}) public _swiperPrimary?: ElementRef<{ swiper: Swiper }>
  @ViewChild("swiperSecoundary", { static: false }) public _swiperSecoundary?: ElementRef<{ swiper: Swiper }>

  public swiperPrimaryConfig?: SwiperOptions
  public swiperSecoundaryConfig?: SwiperOptions

  public initialSlide = 0

  public fakeData = of([0,1,2,3,4,5,6,7,8,9])

  constructor(
  ) { }

  ngOnInit() {
    register()

    this.swiperPrimaryConfig = {
      on: {
        init:()=> { }
      }
    }
    this.swiperSecoundaryConfig = {
      on: {
        init:()=> { }
      }
    }
    if (this._swiperPrimary?.nativeElement) {
      Object.assign(this._swiperPrimary?.nativeElement, this.swiperPrimaryConfig);
    }

    if (this._swiperSecoundary?.nativeElement){
      Object.assign(this._swiperSecoundary?.nativeElement, this.swiperSecoundaryConfig);
    }

  }

  ionViewDidEnter() {

    console.log(this._swiperPrimary);


    // @ts-ignore
    this._swiperPrimary?.nativeElement.initialize()
    // @ts-ignore
    this._swiperSecoundary?.nativeElement.initialize()

  }


  test(){
    console.log('dasdsa');

  }

}
