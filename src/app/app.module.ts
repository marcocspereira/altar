import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GeneratorComponent } from './pages/generator/generator.component';
import { PaymentsComponent } from './pages/payments/payments.component';

@NgModule({
  declarations: [AppComponent, GeneratorComponent, PaymentsComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
