import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { getActiveTraining, TrainingState } from '../training.reduser';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0
  timer
  constructor(
    public dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<TrainingState>) { }

  ngOnInit() {
    this.startOrResumeTimer()
  }

  startOrResumeTimer() {
    this.store.select(getActiveTraining).pipe(take(1)).subscribe(ex => {

      const stepDuration = ex.duration / 100 * 1000
      this.timer = setInterval(() => {
        this.progress = this.progress + 1

        if (this.progress >= 100) {
          this.trainingService.completeExercise()
          clearInterval(this.timer)
        }
      }
        , stepDuration)
    })

  }


  stopTraining() {
    clearInterval(this.timer)

    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress)
      } else {
        this.startOrResumeTimer()
      }
    });

  }

}
