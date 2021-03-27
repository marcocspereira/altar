import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GeneratorComponent } from './pages/generator/generator.component';
import { GeneratorModule } from './pages/generator/generator.module';
import { PaymentsComponent } from './pages/payments/payments.component';
import { PaymentsModule } from './pages/payments/payments.module';
import { TopbarModule } from './shared/topbar/topbar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TopbarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
