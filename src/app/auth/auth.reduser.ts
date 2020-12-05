import { Action, createReducer, on } from '@ngrx/store'
import * as authActions from './auth.actions'

export interface AuthState {
    isAuthenticated: boolean
}

const initialState: AuthState = {
    isAuthenticated: false
}

const reduser = createReducer(
    initialState,
    on(authActions.setAuthenticated, (state: AuthState) => ({ ...state, isAuthenticated: true })),
    on(authActions.setUnauthenticated, (state: AuthState) => ({ ...state, isAuthenticated: false }))

)

export const getIsAuthenticated = (state: AuthState) => state.isAuthenticated;

export function authReduser(state: AuthState, action: Action) {
    return reduser(state, action)
}