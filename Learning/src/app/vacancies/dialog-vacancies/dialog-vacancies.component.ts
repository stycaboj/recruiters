import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VacancyModel } from '../../../core/models/vacancy.model';
import { DataVacanciesModel } from '../../../core/models/data-vacancies.model';

@Component({
  selector: 'app-dialog-vacancies',
  templateUrl: './dialog-vacancies.component.html',
  styleUrl: './dialog-vacancies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogVacanciesComponent {
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataVacanciesModel,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogVacanciesComponent>,
  ) {
    this.form = this.formBuilder.group({
      title: new FormControl('Aboba Developer', Validators.required),
      seniority: new FormControl('Junior', Validators.required),
      salary: new FormControl('1000', Validators.required),
      date: new FormControl('2024-01-01', Validators.required),
      type: new FormControl('Regular', Validators.required),
      recruiter: new FormControl(0, Validators.required),
      description: new FormControl('Whole Lotta Swag', Validators.required),
    });
  }

  public save(): void {
    const newVacancy: VacancyModel = {
      id: 22,
      title: this.form.value.title,
      seniority: this.form.value.seniority,
      salary: this.form.value.salary,
      startDate: this.form.value.date,
      type: this.form.value.type,
      recruiter: this.form.value.recruiter,
      description: this.form.value.description,
    };

    this.dialogRef.close(newVacancy);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
