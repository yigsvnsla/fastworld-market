import { createReducer, on } from '@ngrx/store';
import { actionLoadCart } from '../actions/cart.action';
import { StateCart } from './../states/cart.state';
export const stateProduct: StateCart = {
  httpErrorResponse: null,
  loading: false,
  list: []
}

export const reducerCart = createReducer(
  stateProduct,
  on(
    actionLoadCart,
    (currentState, action) => ({ ...currentState, loading: true })
  )
  // on(
  //   actionLoadProduct,
  //   (currentState, action) => ({ ...currentState, loading: true })
  // ),
  // on(
  //   actionLoadedProduct,
  //   (currentState, { product }) => ({ ...currentState, loading: false, product })
  // ),
  // on(
  //   actionErrorProduct,
  //   (currentState, { httpErrorResponse }) => ({ ...currentState, httpErrorResponse, loading: false })
  // )
)
