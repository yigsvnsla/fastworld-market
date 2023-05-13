import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from './../../core/directives/drag-drop-files.directive';
import { HostListener, ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Gesture, GestureController, ModalController } from '@ionic/angular';
import { ImageCroppedEvent, ImageCropperComponent, ImageTransform, LoadedImage } from 'ngx-image-cropper';

/**
 * Componente para manejar imagenes de manera agnostica v1
 *
 * * acepta eventos de drag and drop
 * * acepta eventos de input _type file_
 * * exporta un blop ya recortado
 *
 * todo: mejorar performance de la recortadora
 *
 * todo: mejorar manejo de gestos alejar ya acercar de la recortadora
 *
 * ?: ¿Implementar otros metodos de recortado?
 */

@Component({
  selector: 'app-modal-image-editor',
  templateUrl: './modal-image-editor.component.html',
  styleUrls: ['./modal-image-editor.component.scss'],
})
export class ModalImageEditorComponent implements OnInit {
  @ViewChild('inputImg') public inputImg! : ElementRef<HTMLInputElement>
  @ViewChild(ImageCropperComponent, { static: false }) public ImageCropperComponent!: ImageCropperComponent
  public showCropper:boolean = false
  public showControl: string = ''
  public transform: ImageTransform = {};
  public canvasRotation = 0;
  public imageFile: File | undefined = undefined
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public scale = 1;
  public maxScale = 3
  constructor(
    private modalController: ModalController,
    private domSanitizer:DomSanitizer
  ) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // Handling Wheel event to zoom

  }

  fileChangeEvent(event: any): void {
    // file change
    // console.log(event);
    this.imageChangedEvent = event;
    this.showCropper = true
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
    // console.log('show cropper');


    let x = document.querySelector('image-cropper')!
    x.addEventListener('wheel', (event: any) => {
      if (event.deltaY < 0) this.zoomOut()
      if (event.deltaY > 0) this.zoomIn()
    }, { passive: true })

  }

  cropperReady() {
    console.log('cropper ready');
    // cropper ready
  }

  loadImageFailed() {
    // show message
    console.log('failer load');

  }

  zoomOut() {
    this.scale -= .1;
    this.transform = { ...this.transform, scale: this.scale };
    console.log('zoom Out');
  }

  zoomIn() {
    this.scale += .1;
    this.transform = { ...this.transform, scale: this.scale };
    console.log('zoom In');
  }

  // rotateLeft() {
  //   this.canvasRotation--;
  //   this.flipAfterRotate();
  // }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }

  pinchEvent({ scale }: any) {
    if (scale < 1) this.transform = { ...this.transform, scale };;
    if (scale > 1) this.transform = { ...this.transform, scale };;

    // this.transform = { ...this.transform, scale };
  }

  public async onExit(role: string, data?: any) {
    (await this.modalController.getTop())?.dismiss(data, role)
  }


  // var imgBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCA..." //your bse64 image

  // onSubmit() {
  //   const file = DataURIToBlob(imgBase64)
  //   const formData = new FormData();
  //   formData.append('upload', file, 'image.jpg')
  //   formData.append('profile_id', this.profile_id) //other param
  //   formData.append('path', 'temp/') //other param
  // }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')

    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? window.atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }

  public dropedImage($event:FileHandle[]){
    this.imageFile = $event[0].file
    this.showCropper = true
  }

  public searchFile(){
    this.inputImg.nativeElement.click()
  }

  public onExport(){
    this.onExit('confirm', {url:this.sanitize(this.DataURIToBlob(this.croppedImage)), blob:this.DataURIToBlob(this.croppedImage) })
  }

  private sanitize(blob:Blob){
    return this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
  }

}
