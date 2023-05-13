import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product.interface";

export enum ActionsCartKeys {
  loadCart = '[App Cart] load Cart',
  loadedCart = '[App Cart] loaded Cart',
  errorCart = '[App Cart] Error loading Cart'
}

export const actionLoadCart = createAction(ActionsCartKeys.loadCart)

export const actionLoadedCart = createAction(ActionsCartKeys.loadedCart, props<{ list: Product[] }>())

export const actionErrorCart = createAction(ActionsCartKeys.errorCart, props<{ httpErrorResponse:HttpErrorResponse }>())
