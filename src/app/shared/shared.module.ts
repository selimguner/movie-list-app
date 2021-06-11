import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as fromComponents from './components';

// material
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';


// 3rd party


const materialModules = [
  MatSnackBarModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatIconModule,
  MatDialogModule
]

@NgModule({
  declarations: [
    ...fromComponents.components,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ...materialModules
  ],
  exports: [
    FormsModule,
    ...fromComponents.components,
    ...materialModules
  ]
})
export class SharedModule { }
