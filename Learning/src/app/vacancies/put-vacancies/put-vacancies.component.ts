import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SeniorityModel } from '../../../core/models/seniority.model';
import { TypeModel } from '../../../core/models/type.model';
import { RecruiterModel } from '../../../core/models/recruiter.model';
import { VacancyModel } from '../../../core/models/vacancy.model';
import { SenioritiesService } from '../../../core/services/seniorities.service';
import { TypesService } from '../../../core/services/types.service';
import { RecruitersService } from '../../../core/services/recruiters.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-put-vacancies',
  templateUrl: './put-vacancies.component.html',
  styleUrl: './put-vacancies.component.scss',
})
export class PutVacanciesComponent implements OnInit, OnDestroy {
  public seniorities: SeniorityModel[] = [];
  public types: TypeModel[] = [];
  public recruiters: RecruiterModel[] = [];
  public form: FormGroup;
  private destroy$ = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly vacancy: VacancyModel, // получение переданных данных
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<PutVacanciesComponent>,
    private readonly senioritiesService: SenioritiesService,
    private readonly typesService: TypesService,
    private readonly recruitersService: RecruitersService
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
      // установка значений из переданных данных в форму
      title: this.vacancy.title,
      seniority: this.vacancy.seniority,
      salary: this.vacancy.salary,
      date: this.vacancy.startDate,
      type: this.vacancy.type,
      recruiter: this.vacancy.recruiter,
      description: this.vacancy.description,
    });
  }

  public ngOnInit(): void {
    this.senioritiesService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.seniorities = data;
      });
    this.typesService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.types = data;
      });
    this.recruitersService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.recruiters = data;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public save(): void {
    const updatedVacancy: VacancyModel = {
      id: this.vacancy.id,
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
