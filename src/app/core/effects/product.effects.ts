import { actionErrorProduct } from './../actions/product.action';
import { ofType } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { ProductService } from './../services/product.service';
import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { actionLoadedProduct, ActionsProductsKeys } from '../actions/product.action';
import { exhaustMap, map, catchError, tap, throwError } from 'rxjs';
import { of } from 'rxjs';

@Injectable()
export class ProductsEffects {
  public loadProduct$
  public notifyErrorProduct$

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {
    this.loadProduct$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ActionsProductsKeys.loadProduct),
        exhaustMap((effectResult) => this.productService.find().pipe(
          map((product) => actionLoadedProduct({ product })),
          catchError((httpErrorResponse) => {

            //// TODO: REPLACE -> this.store.distpach(actionErrorProduct({httpErrorResponse}))
            return of(actionErrorProduct({httpErrorResponse}))
          })
        ))
      )
    )

    this.notifyErrorProduct$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ActionsProductsKeys.errorProduct),
        tap(message => console.error('Notification Service',message))
      ), { dispatch: false })
  }

}
