import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CodeBoxComponent } from './code-box.component';

@NgModule({
  declarations: [CodeBoxComponent],
  imports: [CommonModule],
  exports: [CodeBoxComponent],
})
export class CodeBoxModule {}
