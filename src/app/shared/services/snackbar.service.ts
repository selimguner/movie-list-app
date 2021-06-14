import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {
  snackBarRef: any;
  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone
  ) { }

  open(message: string, color?: string, duration = 2000) {
    this.zone.run(() => {
      if (message) {
        this.snackBarRef = this.snackBar.open(message, '',
          {
            duration,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: [color + '-snackbar']
          });
      }
    });
  }

  closeAll() {
    this.snackBarRef.dismiss();
  }
}
