import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  template: `
    <h2 mat-dialog-title>Silmek istediğinize emin misiniz?</h2>
      <div class="action-buttons">
        <button s-button class="warn" [mat-dialog-close]="true">Sil</button>
        <button s-button [mat-dialog-close]="false">Vazgeç</button>
      </div>`,
  styles: [`
        .title {
        display: block;
        font-size: 11px;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 3px;
      }

      .action-buttons {
        margin-top: 20px;
        display: flex;

        button {
          margin-right: 10px;

          &:first-child {
            width: 154px;
          }
        }
      }`]
})
export class DeleteDialogComponent {
  constructor() { }
}