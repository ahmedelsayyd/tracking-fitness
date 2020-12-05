import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import * as fromTraining from './training.reduser'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  trainingStarted = false

  constructor(private trainingService: TrainingService,
    private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.store.select(fromTraining.getActiveTraining)
      .subscribe(ex => {

        if (ex) {
          this.trainingStarted = true

        } else {
          this.trainingStarted = false

        }
      })

  }

}
