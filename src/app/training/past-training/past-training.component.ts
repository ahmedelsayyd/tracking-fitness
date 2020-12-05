import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reduser'

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator


  displayedColumns = ['date', 'name', 'calories', 'duration', 'state']

  dataSource = new MatTableDataSource<Exercise>()

  constructor(
    private trainingService: TrainingService,
    private store: Store) { }

  ngOnInit() {
    this.trainingService.getCompleteOrCancelledExercise()
    this.store.select(fromTraining.getFinishedTraining)
      .subscribe(result => {
        this.dataSource.data = result
      })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  filter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
