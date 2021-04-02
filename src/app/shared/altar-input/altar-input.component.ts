import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Increasing integer for generating unique ids for input components.
 */
let nextInputUniqueId = 0;

@Component({
  selector: 'app-altar-input',
  templateUrl: './altar-input.component.html',
  styleUrls: ['./altar-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AltarInputComponent,
      multi: true,
    },
  ],
})
export class AltarInputComponent implements OnInit, ControlValueAccessor {
  private _name: string = `app-altar-input-${nextInputUniqueId++}`;
  private _label: string = '';
  private _placeholder: string = '';
  private _value: string;

  @Input()
  get name(): string {
    return this._name;
  }
  set name(val: string) {
    this._name = val;
  }
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(val: string) {
    this._placeholder = val.toUpperCase();
  }
  @Input()
  required: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  get label(): string {
    return this._label;
  }
  set label(val: string) {
    this._label = val.toUpperCase();
  }
  @Input()
  get value(): string {
    return this._value;
  }
  set value(val: string) {
    this._value = val;
    this.onChange(this._value);
  }

  constructor() {}

  onChange: any = () => {};
  onTouched: any = () => {};
  onValidationChange: any = () => {};

  ngOnInit(): void {}

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
