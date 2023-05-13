import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductImagePageRoutingModule } from './product-image-routing.module';

import { ProductImagePage } from './product-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductImagePageRoutingModule
  ],
  declarations: [ProductImagePage],
})
export class ProductImagePageModule {}
