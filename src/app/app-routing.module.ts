import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/generator', pathMatch: 'full' },
  {
    path: 'generator',
    loadChildren: () =>
      import('./pages/generator/generator.module').then(
        (m) => m.GeneratorModule
      ),
  },
  {
    path: 'payments',
    loadChildren: () =>
      import('./pages/payments/payments.module').then((m) => m.PaymentsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
