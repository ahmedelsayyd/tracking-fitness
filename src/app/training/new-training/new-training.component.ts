import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromRoot from '../../app-state/app.redusers'
import * as fromTraining from '../training.reduser'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>
  isLoaded$: Observable<boolean>

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    public store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.fetchExercises()
    this.exercises$ = this.store.select(fromTraining.getAvailabeTraining)
    // this.subscription = this.trainingService.exercisesfetched
    //   .subscribe(exercises => this.exercises = exercises)

    this.isLoaded$ = this.store.select(fromRoot.getIsLoading)
  }

  fetchExercises() {
    this.trainingService.fetchExercises()

  }

  startNewTraing(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise)

  }

}
