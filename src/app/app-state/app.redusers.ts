import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromUi from '../shared/ui-statement/ui.redusers'
import * as fromAuth from '../auth/auth.reduser'


export interface State {
    ui: fromUi.State
    auth: fromAuth.AuthState
}



export const redusers: ActionReducerMap<State> = {
    ui: fromUi.reduser,
    auth: fromAuth.authReduser
}

export const getUiState = createFeatureSelector<fromUi.State>('ui')
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading)

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth')
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuthenticated)