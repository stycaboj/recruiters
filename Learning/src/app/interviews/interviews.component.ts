import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { InterviewModel } from '../../core/models/interview.model';
import { InterviewsService } from '../../core/services/interview.service';
import { CandidateModel } from '../../core/models/candidate.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogInterviewsComponent } from './dialog-interviews/dialog-interviews.component';
import { PutInterviewsComponent } from './put-interviews/put-interviews.component';
import {
  BehaviorSubject,
  filter,
  forkJoin,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { VacanciesService } from '../../core/services/vacancies.service';
import { CandidatesService } from '../../core/services/candidates.service';
import { RecruitersService } from '../../core/services/recruiters.service';
import { VacancyModel } from '../../core/models/vacancy.model';
import { RecruiterModel } from '../../core/models/recruiter.model';
import { DataInterviewsModel } from '../../core/models/data-interviews.model';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrl: './interviews.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterviewsComponent implements OnInit, OnDestroy {
  public columnsToDisplay = [
    'vacancy',
    'recruiter',
    'time',
    'candidate',
    'buttons',
  ];

  public vacancies: VacancyModel[] = [];
  public candidates: CandidateModel[] = [];
  public recruiters: RecruiterModel[] = [];
  public interviews$ = new BehaviorSubject<Array<InterviewModel> | null>(null);
  private destroy$ = new Subject();

  constructor(
    private readonly vacanciesService: VacanciesService,
    private readonly candidatesService: CandidatesService,
    private readonly recruitersService: RecruitersService,
    private readonly interviewsService: InterviewsService,
    private readonly dialog: MatDialog,
    private readonly spinner: NgxSpinnerService
  ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.getInterviewsList();
    forkJoin([
      this.vacanciesService.get().pipe(takeUntil(this.destroy$)),
      this.candidatesService.get().pipe(takeUntil(this.destroy$)),
      this.recruitersService.get().pipe(takeUntil(this.destroy$)),
    ]).subscribe(([vacancies, candidates, recruiters]) => {
      this.vacancies = vacancies;
      this.candidates = candidates;
      this.recruiters = recruiters;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public getInterviewsList(): void {
    this.interviewsService
      .get()
      .pipe(
        takeUntil(this.destroy$),
        tap((item) => {
          if (item) {
            this.spinner.hide();
          }
        })
      )
      .subscribe((items) => this.interviews$.next(items));
  }

  public openInterviewsDialog(): void {
    const dialogRef = this.dialog.open<DialogInterviewsComponent, DataInterviewsModel>(DialogInterviewsComponent, {
      width: '25rem',
      data: {
        vacancies: this.vacancies,
        candidates: this.candidates,
        recruiters: this.recruiters,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter((item) => item)
      )
      .subscribe((result) => {
        this.addInterview(result);
      });
  }

  public openPutDialog(interview: InterviewModel): void {
    const dialogRef = this.dialog.open<PutInterviewsComponent, DataInterviewsModel>(PutInterviewsComponent, {
      width: '25rem',
      data: {
        interview,
        vacancies: this.vacancies,
        candidates: this.candidates,
        recruiters: this.recruiters,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter((item) => item)
      )
      .subscribe((result) => {
        this.updateInterview(result);
      });
  }

  private addInterview(newInterview: InterviewModel): void {
    this.spinner.show();
    this.interviewsService
      .post(newInterview)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getInterviewsList();
      });
  }

  public deleteInterview(interview: InterviewModel): void {
    this.spinner.show();
    this.interviewsService
      .delete(interview.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getInterviewsList();
      });
  }

  private updateInterview(updatedInterview: InterviewModel): void {
    this.spinner.show();
    this.interviewsService
      .put(updatedInterview)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getInterviewsList();
      });
  }
}
