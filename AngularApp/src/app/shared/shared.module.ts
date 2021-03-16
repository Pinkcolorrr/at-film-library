import { NgModule } from '@angular/core';

import { MaterialModule } from '../modules/material/material.module';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

/**
 * Root app-module
 */
@NgModule({
  declarations: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  imports: [MaterialModule],
})
export class SharedModule {}
