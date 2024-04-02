import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { VacanciesService } from '../../core/services/vacancies.service';
import { RecruitersService } from '../../core/services/recruiters.service';
import { VacancyModel } from '../../core/models/vacancy.model';
import { RecruiterModel } from '../../core/models/recruiter.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogVacanciesComponent } from './dialog-vacancies/dialog-vacancies.component';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { PutVacanciesComponent } from './put-vacancies/put-vacancies.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss',
})
export class VacanciesComponent implements OnInit, OnDestroy {
  public vacancies: VacancyModel[] = [];
  public recruiters: RecruiterModel[] = [];
  private destroy$ = new Subject();

  constructor(
    private readonly vacanciesService: VacanciesService,
    private readonly recruitersService: RecruitersService,
    private readonly dialog: MatDialog,
    private readonly spinner: NgxSpinnerService
  ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.vacanciesService
      .get()
      .pipe(
        switchMap((vacancies) => {
          this.vacancies = vacancies;
          return this.recruitersService.get();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((recruiters) => {
        this.spinner.hide();
        this.recruiters = recruiters;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public getIcon(vacancy: VacancyModel): string {
    return vacancy.title.slice(0, 3).toUpperCase();
  }

  public imageOfRecruiter(recruiterId: number) {
    return this.recruiters.find((recruiter) => recruiter.id === recruiterId)
      ?.image;
  }

  public openVacanciesDialog(): void {
    const dialogRef = this.dialog.open(DialogVacanciesComponent, {
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
    const dialogRef = this.dialog.open(PutVacanciesComponent, {
      width: '25rem',
      data: vacancy, // передача данных редактируемого элемента в попап
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
    this.vacanciesService
      .post(newVacancy)
      .pipe(takeUntil(this.destroy$))
      .subscribe((addedVacancy) => {
        this.vacancies.push(addedVacancy);
      });
  }

  public deleteVacancy(vacancy: VacancyModel): void {
    this.vacancies = this.vacancies.filter((item) => item !== vacancy);
    this.vacanciesService
      .delete(vacancy.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private updateVacancy(updatedVacancy: VacancyModel): void {
    let index = 0;
    const vacancy = this.vacancies.find((item, vacancyIndex) => {
      if (item.id === updatedVacancy.id) {
        index = vacancyIndex;
      }
      return item.id === updatedVacancy.id;
    });
    if (vacancy) {
      this.vacanciesService
        .put(updatedVacancy)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.vacancies[index] = updatedVacancy;
        });
    }
  }
}
