import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  @Input() navbarItems;

  currentTime = new Date();
  timeHandler;

  constructor() {}

  ngOnInit(): void {
    this.timeHandler = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timeHandler);
  }
}
