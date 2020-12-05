import { createAction, props, union } from "@ngrx/store";
import { Exercise } from './exercise.model';


export const availableExercises = createAction('[Training] Set Available Exercises', props<{ exercises: Exercise[] }>())

export const finishedExercises = createAction('[Training] Set Finished Exercises', props<{ exercises: Exercise[] }>())

export const startTraining = createAction('[Training] Start Training', props<{ exerciseId: string }>())

export const endTraining = createAction('[Training] End Training')


const actions = union({
    availableExercises,
    finishedExercises,
    startTraining,
    endTraining
})

export type trainingActions = typeof actions