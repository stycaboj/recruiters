import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VacancyModel } from '../../../core/models/vacancy.model';
@Component({
  selector: 'app-put-vacancies',
  templateUrl: './put-vacancies.component.html',
  styleUrl: './put-vacancies.component.scss',
})
export class PutVacanciesComponent {
  public form: FormGroup;
  // TODO: в put-vacancies и put-interviews не работает data model
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<PutVacanciesComponent>,
  ) {
    this.form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      seniority: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      recruiter: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    this.form.patchValue({
      title: this.data.vacancy.title,
      seniority: this.data.vacancy.seniority,
      salary: this.data.vacancy.salary,
      date: this.data.vacancy.startDate,
      type: this.data.vacancy.type,
      recruiter: this.data.vacancy.recruiter,
      description: this.data.vacancy.description,
    });
  }

  public save(): void {
    const updatedVacancy: VacancyModel = {
      id: this.data.vacancy.id,
      title: this.form.value.title,
      seniority: this.form.value.seniority,
      salary: this.form.value.salary,
      startDate: this.form.value.date,
      type: this.form.value.type,
      recruiter: this.form.value.recruiter,
      description: this.form.value.description,
    };

    this.dialogRef.close(updatedVacancy);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
