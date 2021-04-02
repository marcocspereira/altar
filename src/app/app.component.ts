import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  links = [
    { title: 'Generator', route: '/generator' },
    { title: 'Payments', route: '/payments' },
  ];

  ngOnDestroy() {
    sessionStorage.removeItem('paymentData');
  }
}
