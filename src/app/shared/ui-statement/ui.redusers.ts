import { Action, createReducer, on } from "@ngrx/store"
import * as uiActions from './ui.actions'

export interface State {
    isLoading: boolean
}

const initialState: State = { isLoading: false }

const uiReducer = createReducer(
    initialState,
    on(uiActions.startLoading, (state: State) => ({ ...state, isLoading: true })),
    on(uiActions.stopLoading, (state: State) => ({ ...state, isLoading: false }))
);

export const getIsLoading = (state: State) => state.isLoading


export function reduser(state: State, action: Action) {
    return uiReducer(state, action)
}    