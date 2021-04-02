import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AltarInputComponent } from 'src/app/shared/altar-input/altar-input.component';

@NgModule({
  declarations: [AltarInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [AltarInputComponent],
})
export class AltarInputModule {}
