import { actionErrorProduct } from './../actions/product.action';
import { createReducer, on } from '@ngrx/store';
import { actionLoadedProduct, actionLoadProduct } from '../actions/product.action';
import { StateProduct } from '../states/product.state';
import { Product } from './../models/product.interface';


export const stateProduct: StateProduct = {
  httpErrorResponse: null,
  loading: false,
  product: {
    name: '',
    value: 0
  }
}


export const reducerProduct = createReducer(
  stateProduct,
  on(
    actionLoadProduct,
    (currentState, action) => ({ ...currentState, loading: true })
  ),
  on(
    actionLoadedProduct,
    (currentState, { product }) => ({ ...currentState, loading: false, product })
  ),
  on(
    actionErrorProduct,
    (currentState, { httpErrorResponse }) => ({ ...currentState, httpErrorResponse, loading: false })
  )
)
