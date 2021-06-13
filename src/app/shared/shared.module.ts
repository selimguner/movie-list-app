import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as fromComponents from './components';

// material
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { SnackBarService } from './services/snackbar.service';
import { DialogService } from './services/dialog.service';

// 3rd party


const materialModules = [
  MatSnackBarModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatIconModule,
  MatDialogModule,
  OverlayModule,
]

@NgModule({
  declarations: [
    ...fromComponents.components
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules
  ],
  providers: [
    SnackBarService,
    DialogService
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ...fromComponents.components,
    ...materialModules
  ]
})
export class SharedModule { }
