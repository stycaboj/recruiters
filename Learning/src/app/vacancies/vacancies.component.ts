import { Component, Input, OnInit } from '@angular/core';
import { VacanciesService } from '../../core/services/vacancies.service';
import { RecruitersService } from '../../core/services/recruiters.service';
import { VacancyModel } from '../../core/models/vacancy.model';
import { RecruiterModel } from '../../core/models/recruiter.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogVacanciesComponent } from './dialog-vacancies/dialog-vacancies.component';
import { switchMap } from 'rxjs';
import { PutVacanciesComponent } from './put-vacancies/put-vacancies.component';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss',
})
export class VacanciesComponent implements OnInit {
  public vacancies: VacancyModel[] = [];
  public recruiters: RecruiterModel[] = [];

  constructor(
    private readonly vacanciesService: VacanciesService,
    private readonly recruitersService: RecruitersService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.vacanciesService
      .get()
      .pipe(
        switchMap((vacancies) => {
          this.vacancies = vacancies;
          return this.recruitersService.get();
        })
      )
      .subscribe((recruiters) => {
        this.recruiters = recruiters;
      });
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
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addVacancy(result);
      }
    });
  }

  public openPutDialog(vacancy: VacancyModel): void {
    const dialogRef = this.dialog.open(PutVacanciesComponent, {
      width: '400px',
      data: vacancy, // передача данных редактируемого элемента в попап
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateVacancy(result);
      }
    });
  }

  private addVacancy(newVacancy: VacancyModel): void {
    this.vacanciesService.post(newVacancy).subscribe((addedVacancy) => {
      this.vacancies.push(addedVacancy);
    });
  }

  public deleteVacancy(vacancy: VacancyModel): void {
    this.vacancies = this.vacancies.filter((arr) => arr !== vacancy);
    this.vacanciesService.delete(vacancy.id).subscribe();
  }

  private updateVacancy(updatedVacancy: VacancyModel): void {
    const index = this.vacancies.findIndex(
      (v) => v.id === updatedVacancy.id
    );
    if (index !== -1) {
      this.vacanciesService.put(updatedVacancy).subscribe(() => {
        this.vacancies[index] = updatedVacancy;
      });
    }
  }
}
