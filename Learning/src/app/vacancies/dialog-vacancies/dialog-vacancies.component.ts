import { Component, OnDestroy, OnInit } from '@angular/core';
import { SenioritiesService } from '../../../core/services/seniorities.service';
import { TypesService } from '../../../core/services/types.service';
import { RecruitersService } from '../../../core/services/recruiters.service';
import { SeniorityModel } from '../../../core/models/seniority.model';
import { TypeModel } from '../../../core/models/type.model';
import { RecruiterModel } from '../../../core/models/recruiter.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VacancyModel } from '../../../core/models/vacancy.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dialog-vacancies',
  templateUrl: './dialog-vacancies.component.html',
  styleUrl: './dialog-vacancies.component.scss',
})
export class DialogVacanciesComponent implements OnInit, OnDestroy {
  public seniorities: SeniorityModel[] = [];
  public types: TypeModel[] = [];
  public recruiters: RecruiterModel[] = [];
  public form: FormGroup;
  public destroy$ = new Subject();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogVacanciesComponent>,
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
