import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductPage } from './product.page';

const routes: Routes = [
  {
    path: '',
    component: ProductPage
  },
  {
    path: 'image',
    loadChildren: () => import('../product-image/product-image.module').then( m => m.ProductImagePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPageRoutingModule {}
