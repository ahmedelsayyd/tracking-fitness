import { createAction, union } from '@ngrx/store';


export const startLoading = createAction(
    '[UI] Start Loading'

)


export const stopLoading = createAction(
    '[UI] Stop Loading'

)

const actions = union({
    startLoading,
    stopLoading
})

export type UIActions = typeof actions