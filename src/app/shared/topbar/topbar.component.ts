import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Topbar } from './topbar.type';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
/**
 * Component that handles the options to display and redirect to routes
 * and a clock with current hour.
 * */
export class TopbarComponent implements OnInit, OnDestroy {
  /** The options to list with corresponding routes to redirect. */
  @Input() topbarItems: Array<Topbar> = [];

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
