import { createAction, union } from '@ngrx/store';



export const setAuthenticated = createAction(
    '[auth] Set Authenticated'
)

export const setUnauthenticated = createAction(
    '[auth] Set Unauthenticated'
)

const actions = union({
    setAuthenticated,
    setUnauthenticated
})

export type AuthActions = typeof actions