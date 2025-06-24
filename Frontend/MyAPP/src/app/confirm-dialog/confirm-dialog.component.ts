import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';


export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmation?: boolean; // Optional flag to decide button layout
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, NgIf],
  styleUrl: './confirm-dialog.component.css'
})

export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onClose(result: boolean): void {
    this.dialogRef.close(result);
  }
}
