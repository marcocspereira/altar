import { Component, OnDestroy } from '@angular/core';
import { TopbarModule } from './shared/topbar/topbar.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  links: Array<TopbarModule> = [
    { title: 'Generator', route: '/generator' },
    { title: 'Payments', route: '/payments' },
  ];

  ngOnDestroy() {
    sessionStorage.removeItem('paymentData');
  }
}
