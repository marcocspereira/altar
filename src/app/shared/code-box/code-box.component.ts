import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-box',
  templateUrl: './code-box.component.html',
  styleUrls: ['./code-box.component.css'],
})
/** Component that displays the generated code and curresponding status. */
export class CodeBoxComponent implements OnInit {
  /** Code generation status that is updated by the host. */
  @Input() status: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
