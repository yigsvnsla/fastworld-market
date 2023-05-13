import { NgModule, isDevMode, CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './core/states/app.state';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import * as Hammer from 'hammerjs';
import { DragDropFilesDirective } from './core/directives/drag-drop-files.directive';

@Injectable({providedIn:'root'})
export class HammerConfig extends HammerGestureConfig {
  override overrides = {
    'pinch': {
      enable: true,
      direction: Hammer.DIRECTION_ALL
    },
    'rotate': {
      enable: false,
      direction: Hammer.DIRECTION_ALL
    }
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',

    }),
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    EffectsModule.forRoot([]),
    HammerModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerConfig

    }
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
