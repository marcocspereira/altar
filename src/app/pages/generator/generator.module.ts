import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneratorComponent } from './generator.component';

const routes: Routes = [{ path: '', component: GeneratorComponent }];

@NgModule({
  declarations: [GeneratorComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratorModule {}
