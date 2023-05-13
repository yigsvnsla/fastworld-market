import { reducerProduct } from './../reducers/product.reducer';
import { StateProduct } from './product.state';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
  stateProduct: StateProduct
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  stateProduct:reducerProduct
  /** */
}
