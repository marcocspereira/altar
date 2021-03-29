import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-box',
  templateUrl: './code-box.component.html',
  styleUrls: ['./code-box.component.css'],
})
export class CodeBoxComponent implements OnInit {
  @Input() status: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
