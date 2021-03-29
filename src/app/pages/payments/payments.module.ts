import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeBoxModule } from 'src/app/shared/code-box/code-box.module';
import { PaymentsComponent } from './payments.component';

const routes: Routes = [{ path: '', component: PaymentsComponent }];

@NgModule({
  declarations: [PaymentsComponent],
  imports: [RouterModule.forChild(routes), CodeBoxModule],
  exports: [RouterModule],
})
export class PaymentsModule {}
