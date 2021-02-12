import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PipeFilterMatTableData } from './pipes/filterMatTableData';

/**
 * Module for sharing common things like pipes
 */
@NgModule({
  imports: [CommonModule],
  declarations: [PipeFilterMatTableData],
  exports: [PipeFilterMatTableData],
})
export class SharedModule {}
