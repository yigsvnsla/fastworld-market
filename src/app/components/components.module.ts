import { NumpadComponent } from './numpad/numpad.component';
import { DragableGridComponent } from './dragable-grid/dragable-grid.component';
import { ModalImageProductsComponent } from './modal-image-products/modal-image-products.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImageCropperModule } from 'ngx-image-cropper';

import { SingInComponent } from './sing-in/sing-in-component.component';
import { ModalImageEditorComponent } from './modal-image-editor/modal-image-editor.component';
import { DragDropFilesDirective } from '../core/directives/drag-drop-files.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    DragDropModule,

  ],
  exports: [
    ModalImageProductsComponent,
    SingInComponent,
    SingUpComponent,
  ],
  declarations: [
    ModalImageProductsComponent,
    SingInComponent,
    SingUpComponent,
    ModalImageEditorComponent,
    DragableGridComponent,
    DragDropFilesDirective,
    NumpadComponent
  ],
  providers: [],
})
export class ComponentsModule { }
