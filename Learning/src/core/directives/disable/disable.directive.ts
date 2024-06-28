import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { filter, Observable, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[permissionDirective]',
})
export class PermissionDirective implements AfterViewInit, OnDestroy {
  @Input('permissionDirective') permissionName: string = '';
  public destroy$ = new Subject();

  constructor(
    private readonly eleRef: ElementRef,
    private readonly settingsService: SettingsService
  ) {}

  public ngAfterViewInit() {
    this.settingsService
      .checkPermission(this.permissionName)
      .pipe(
        takeUntil(this.destroy$),
        filter((item) => !item)
      )
      .subscribe(() => {
        this.disableElement();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private disableElement() {
    this.eleRef.nativeElement.style.background = '#e0e0e0';
    this.eleRef.nativeElement.style.textColor = '#8b8b8b';
    this.eleRef.nativeElement.disabled = true;
  }
}
