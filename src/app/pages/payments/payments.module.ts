import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AltarInputModule } from 'src/app/shared/altar-input/altar-input.module';
import { CodeBoxModule } from 'src/app/shared/code-box/code-box.module';
import { PaymentsComponent } from './payments.component';
const routes: Routes = [{ path: '', component: PaymentsComponent }];

@NgModule({
  declarations: [PaymentsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    CodeBoxModule,
    AltarInputModule,
  ],
  exports: [RouterModule],
})
export class PaymentsModule {}
