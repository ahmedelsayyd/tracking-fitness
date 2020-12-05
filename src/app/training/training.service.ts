import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';

import { Exercise } from './exercise.model';
import { Store } from '@ngrx/store'
import * as UI from '../shared/ui-statement/ui.actions';
import * as fromTraining from './training.reduser';
import * as trainingActions from './training.actions';
import { getActiveTraining } from './training.reduser';




@Injectable()
export class TrainingService {

    exerciseChanged = new Subject<Exercise>()
    exercisesfetched = new Subject<Exercise[]>()
    finishedExercisesChanged = new Subject<Exercise[]>()

    // private exercises = []
    // private runningExercise: Exercise
    private fbSubscription: Subscription[] = []

    constructor(
        private db: AngularFirestore,
        private uiService: UIService,
        private store: Store<fromTraining.State>) { }

    fetchExercises() {
        //this.uiService.loadingStateChanged.next(true)
        this.store.dispatch(UI.startLoading())

        this.fbSubscription.push(this.db.collection<Exercise>('availableExercises').snapshotChanges()
            .pipe(map(result => {
                return result.map(data => {
                    return {
                        id: data.payload.doc.id,
                        name: data.payload.doc.data().name,
                        duration: data.payload.doc.data().duration,
                        calories: data.payload.doc.data().calories
                    }
                })
            }))
            .subscribe((exercises: Exercise[]) => {
                //this.exercises = exercises
                //this.uiService.loadingStateChanged.next(false)
                this.store.dispatch(UI.stopLoading())

                //this.exercisesfetched.next([...exercises])
                this.store.dispatch(trainingActions.availableExercises({ exercises: exercises }))

            }, (error) => {
                //this.uiService.loadingStateChanged.next(false)
                this.store.dispatch(UI.stopLoading())

                this.uiService.showSnackBar('Fetching Exercises Failed, Please Tray Again!', null, 3000)
                this.exercisesfetched.next(null)
            }))
    }


    startExercise(selectedId: string) {
        //this.runningExercise = this.exercises.find(ex => ex.id === selectedId)
        //this.exerciseChanged.next(this.runningExercise)
        this.store.dispatch(trainingActions.startTraining({ exerciseId: selectedId }))
    }


    completeExercise() {
        this.store.select(getActiveTraining).pipe(take(1)).subscribe(ex => {

            this.addFinishedExerciseToDatabase({
                ...ex,
                date: new Date(),
                state: 'completed'
            })
        })
        // this.runningExercise = null
        // this.exerciseChanged.next(null)
        this.store.dispatch(trainingActions.endTraining())
    }


    cancelExercise(progress) {
        this.store.select(getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addFinishedExerciseToDatabase({
                ...ex,
                duration: ex.duration * (progress / 100),
                calories: ex.duration * (progress / 100),
                date: new Date(),
                state: 'cancelled'
            })
        })
        this.store.dispatch(trainingActions.endTraining())
    }


    getCompleteOrCancelledExercise() {
        this.fbSubscription.push(this.db.collection<Exercise>('FinishedExercises')
            .valueChanges()
            .subscribe(result => {
                //this.finishedExercisesChanged.next(result)
                this.store.dispatch(trainingActions.finishedExercises({ exercises: result }))

            }))
    }


    addFinishedExerciseToDatabase(exercise: Exercise) {
        this.db.collection('/FinishedExercises').add(exercise)
    }


    cancelFbSubscription() {
        this.fbSubscription.forEach(sub => sub.unsubscribe())
    }


}