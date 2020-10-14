import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogueService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog = (msg) => {
    return this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '400px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: '10px' },
      data: {
        message : msg
      }
    });
}

}
