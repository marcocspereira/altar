import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeBoxModule } from 'src/app/shared/code-box/code-box.module';
import { GeneratorComponent } from './generator.component';

const routes: Routes = [{ path: '', component: GeneratorComponent }];

@NgModule({
  declarations: [GeneratorComponent],
  imports: [CommonModule, RouterModule.forChild(routes), CodeBoxModule],
  exports: [RouterModule],
})
export class GeneratorModule {}
