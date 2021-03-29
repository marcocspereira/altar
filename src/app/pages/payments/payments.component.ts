import { Component, OnInit } from '@angular/core';
import { CodeManagerService } from 'src/app/shared/code-manager/code-manager.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  constructor(private _codeManager: CodeManagerService) {}

  ngOnInit(): void {}
}
