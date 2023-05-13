import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product.interface";

export enum ActionsProductsKeys {
  loadProduct = '[App Product] load product',
  loadedProduct = '[App Product] loaded product',
  errorProduct = '[App Product] Error loading product'
}

export const actionLoadProduct = createAction(ActionsProductsKeys.loadProduct)

export const actionLoadedProduct = createAction(ActionsProductsKeys.loadedProduct, props<{ product: Product }>())

export const actionErrorProduct = createAction(ActionsProductsKeys.errorProduct, props<{ httpErrorResponse:HttpErrorResponse }>())
