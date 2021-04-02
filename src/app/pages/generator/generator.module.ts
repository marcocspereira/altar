import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AltarInputModule } from 'src/app/shared/altar-input/altar-input.module';
import { CodeBoxModule } from 'src/app/shared/code-box/code-box.module';
import { GeneratorComponent } from './generator.component';

const routes: Routes = [{ path: '', component: GeneratorComponent }];

@NgModule({
  declarations: [GeneratorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CodeBoxModule,
    AltarInputModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class GeneratorModule {}
