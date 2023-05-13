import { EffectsModule } from '@ngrx/effects';
import { reducerProduct } from './../core/reducers/product.reducer';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';
import { StoreModule } from '@ngrx/store';
import { ProductsEffects } from '../core/effects/product.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    StoreModule.forFeature('stateProduct', reducerProduct),
    EffectsModule.forFeature(ProductsEffects),
  ],
  providers:[],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ProductPage],
})
export class ProductPageModule {}
