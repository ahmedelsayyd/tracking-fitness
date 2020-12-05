import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { SharedMoudule } from '../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { trainingReduser } from './training.reduser';

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        PastTrainingComponent,
        NewTrainingComponent,
    ],
    imports: [
        SharedMoudule,
        TrainingRoutingModule,
        StoreModule.forFeature('training', trainingReduser)

    ],
    exports: [


    ]
})

export class TrainingModule {

}