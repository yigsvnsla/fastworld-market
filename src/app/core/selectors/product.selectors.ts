import { AppState } from '../states/app.state';
import { createSelector } from '@ngrx/store';

const stateProduct = (store:AppState)=>(store.stateProduct)

export const selectorProduct = createSelector(
  stateProduct,
  (s1)=> s1.product
)

export const selectorProductLoading = createSelector(
 stateProduct,
 (s1)=>s1.loading
)

export const selectorProductError = createSelector(
  stateProduct,
  (s1)=> s1.httpErrorResponse
)


// export const selectAppConfigState = (appState: AppState) => (appState.appConfig);

// export const selectAppConfigTheme = createSelector(
//   selectAppConfigState, (state) => (state.theme)
// )

// export const selectAppConfig = createSelector(
//   selectAppConfigState, (state) => (state)
// )
