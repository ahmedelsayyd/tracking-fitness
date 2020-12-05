import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'stop-training',
    template: `
    <h1 mat-dialog-title>Are You Sure</h1>
    <div mat-dialog-content>
    <p>You Already Got {{passedData.progress}}%</p>
    </div>
    <div mat-dialog-actions>
        <button mat-button [mat-dialog-close]="false" >No Thanks </button>
        <button mat-button [mat-dialog-close]="true">Ok</button>
    </div>


    `
})
export class StopTrainingComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }
}