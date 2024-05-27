import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlideToggleComponent),
      multi: true,
    },
  ],
})
export class SlideToggleComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) permission?: string;
  @Input() formControlName?: string;

  public status: boolean = false;
  public value?: string | null = null;
  private onChange!: (value: any) => void;
  private onTouched!: () => void;

  get control() {
    return this.formGroup.form.controls[this.formControlName ?? ''];
  }

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private formGroup: FormGroupDirective
  ) {}

  public ngOnInit(): void {
    if (this.control.value !== null) {
      this.status = true;
    }
    this.control.valueChanges.subscribe(() => {
      this.control.value ? (this.status = true) : (this.status = false);
      this.changeDetector.detectChanges()
    });
  }

  public onToggleChange(event: MatSlideToggleChange): void {
    if (event.checked) {
      this.value = this.permission;
    } else {
      this.value = null;
    }

    this.onChange(this.value);
  }

  public writeValue(value: string | null): void {
    this.value = value;

    this.changeDetector.detectChanges();
  }

  public registerOnChange(fn: (event: Event) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
