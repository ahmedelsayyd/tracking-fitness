import { Exercise } from './exercise.model';
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as fromTraining from './training.actions'
import * as fromRoot from '../app-state/app.redusers'


export interface TrainingState {
    availableTraining: Exercise[];
    finishedTraining: Exercise[];
    activeTraining: Exercise;
}

export interface State extends fromRoot.State {
    training: TrainingState
}

const initialState = {
    availableTraining: [],
    finishedTraining: [],
    activeTraining: null
}

const reduser = createReducer(
    initialState,
    on(fromTraining.availableExercises, (state, props) => ({ ...state, availableTraining: props.exercises })),
    on(fromTraining.finishedExercises, (state, props) => ({ ...state, finishedTraining: props.exercises })),
    on(fromTraining.startTraining,
        (state, props) =>
            ({ ...state, activeTraining: state.availableTraining.find(ex => ex.id === props.exerciseId) })),
    on(fromTraining.endTraining, (state) => ({ ...state, activeTraining: null }))
)

export function trainingReduser(state: TrainingState, actions: Action) {
    return reduser(state, actions)
}


const getTrainingState = createFeatureSelector('training')

export const getAvailabeTraining = createSelector(getTrainingState, (state: TrainingState) => state.availableTraining)
export const getFinishedTraining = createSelector(getTrainingState, (state: TrainingState) => state.finishedTraining)
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining)