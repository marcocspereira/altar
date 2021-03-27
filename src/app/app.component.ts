import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  links = [
    { title: 'Generator', route: '/generator' },
    { title: 'Payments', route: '/payments' },
  ];
}
