import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { VacanciesService } from '../../core/services/vacancies.service';
import { RecruitersService } from '../../core/services/recruiters.service';
import { VacancyModel } from '../../core/models/vacancy.model';
import { RecruiterModel } from '../../core/models/recruiter.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogVacanciesComponent } from './dialog-vacancies/dialog-vacancies.component';
import { BehaviorSubject, filter, Subject, takeUntil, tap } from 'rxjs';
import { PutVacanciesComponent } from './put-vacancies/put-vacancies.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SenioritiesService } from '../../core/services/seniorities.service';
import { TypesService } from '../../core/services/types.service';
import { SeniorityModel } from '../../core/models/seniority.model';
import { TypeModel } from '../../core/models/type.model';
import { DataVacanciesModel } from '../../core/models/data-vacancies.model';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacanciesComponent implements OnInit, OnDestroy {
  public vacancies$ = new BehaviorSubject<Array<VacancyModel> | null>(null);
  public recruiters$ = new BehaviorSubject<Array<RecruiterModel> | null>(null);
  public seniorities: SeniorityModel[] = [];
  public types: TypeModel[] = [];
  public recruiters: RecruiterModel[] = [];
  private destroy$ = new Subject();

  constructor(
    private readonly vacanciesService: VacanciesService,
    private readonly recruitersService: RecruitersService,
    private readonly senioritiesService: SenioritiesService,
    private readonly typesService: TypesService,
    private readonly dialog: MatDialog,
    private readonly spinner: NgxSpinnerService
  ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.getVacanciesList();
    this.recruitersService
      .get()
      .pipe(
        takeUntil(this.destroy$),
        tap((item) => {
          if (item) {
            this.spinner.hide();
          }
        })
      )
      .subscribe((items) => this.recruiters$.next(items));
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

  public getVacanciesList(): void {
    this.vacanciesService
      .get()
      .pipe(
        takeUntil(this.destroy$),
        tap((item) => {
          if (item) {
            this.spinner.hide();
          }
        })
      )
      .subscribe((items) => this.vacancies$.next(items));
  }

  public openVacanciesDialog(): void {
    const dialogRef = this.dialog.open<DialogVacanciesComponent, DataVacanciesModel>(DialogVacanciesComponent, {
      data: {
        recruiters: this.recruiters,
        seniorities: this.seniorities,
        types: this.types,
      },
      width: '25rem',
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter((item) => item)
      )
      .subscribe((result) => {
        this.addVacancy(result);
      });
  }

  public openPutDialog(vacancy: VacancyModel): void {
    const dialogRef = this.dialog.open<PutVacanciesComponent, DataVacanciesModel>(PutVacanciesComponent, {
      width: '25rem',
      data: {
        vacancy,
        recruiters: this.recruiters,
        seniorities: this.seniorities,
        types: this.types,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter((item) => item)
      )
      .subscribe((result) => {
        this.updateVacancy(result);
      });
  }

  private addVacancy(newVacancy: VacancyModel): void {
    this.spinner.show();
    this.vacanciesService
      .post(newVacancy)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getVacanciesList();
      });
  }

  public deleteVacancy(deletedVacancy: VacancyModel): void {
    this.spinner.show();
    this.vacanciesService
      .delete(deletedVacancy.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getVacanciesList();
      });
  }

  private updateVacancy(updatedVacancy: VacancyModel): void {
    this.spinner.show();
    this.vacanciesService
      .put(updatedVacancy)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getVacanciesList();
      });
  }
}
