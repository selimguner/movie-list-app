import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../components/dialogs/dialogs.component';

@Injectable()

export class DialogService {
  constructor(
    private dialog: MatDialog
  ) { }

  deleteDialog() {
    return this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      disableClose: true
    })
  }


}
