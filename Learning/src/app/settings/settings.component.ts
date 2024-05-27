import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SettingsService } from '../../core/services/settings.service';
import { Subject, takeUntil } from 'rxjs';
import { PERMISSIONS } from '../../core/constans';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SettingsFormService } from '../../core/services/settings-form.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnDestroy {
  public permissions = PERMISSIONS;
  public destroy$ = new Subject();
  public columnsToDisplay = ['tab', 'view', 'create', 'edit', 'delete'];
  public form?: FormGroup;
  public dataSource = new MatTableDataSource<any>();

  constructor(
    private readonly settingsService: SettingsService,
    private readonly settingsFormService: SettingsFormService,
  ) {}

  public ngOnInit(): void {
    this.settingsService.load();
    this.settingsService
      .getPermissions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((permissions) => {
        this.permissions = permissions;
        this.form = this.settingsFormService.createForm(permissions);
        this.dataSource.data = [this.form.value];
        this.settingsFormService.setFormValueChanges(this.form);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public save(): void {
    this.settingsFormService.updatePermissionsForm(this.form!, this.permissions);
    this.settingsService.save(this.permissions);
  }
}
