import { Component, OnDestroy, OnInit } from '@angular/core';
import { InterviewModel } from '../../core/models/interview.model';
import { InterviewsService } from '../../core/services/interview.service';
import { CandidateModel } from '../../core/models/candidate.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogInterviewsComponent } from './dialog-interviews/dialog-interviews.component';
import { PutInterviewsComponent } from './put-interviews/put-interviews.component';
import { filter, Subject, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrl: './interviews.component.scss',
})
export class InterviewsComponent implements OnInit, OnDestroy {
  public columnsToDisplay = [
    'vacancy',
    'recruiter',
    'time',
    'candidate',
    'buttons',
  ];

  public interviews: InterviewModel[] = [];
  private destroy$ = new Subject();

  constructor(
    private readonly interviewsService: InterviewsService,
    private readonly dialog: MatDialog,
    private readonly spinner: NgxSpinnerService
  ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.interviewsService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.spinner.hide();
        this.interviews = data;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public getSkills(candidate: CandidateModel): string {
    const skills = candidate.skills;
    return skills.join(', ');
  }

  public openInterviewsDialog(): void {
    const dialogRef = this.dialog.open(DialogInterviewsComponent, {
      width: '25rem',
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
    const dialogRef = this.dialog.open(PutInterviewsComponent, {
      width: '25rem',
      data: interview, // передача данных редактируемого элемента в попап
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
    this.interviewsService
      .post(newInterview)
      .pipe(takeUntil(this.destroy$))
      .subscribe((addedInterview) => {
        this.interviews.push(addedInterview);
      });
  }

  public deleteInterview(interview: InterviewModel): void {
    this.interviews = this.interviews.filter((item) => item !== interview);
    this.interviewsService
      .delete(interview.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private updateInterview(updatedInterview: InterviewModel): void {
    let index = 0;
    const interview = this.interviews.find((item, interviewIndex) => {
      if (item.id === updatedInterview.id) {
        index = interviewIndex;
      }
      return item.id === updatedInterview.id;
    });
    if (interview) {
      this.interviewsService
        .put(updatedInterview)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.interviews[index] = updatedInterview;
        });
    }
  }
}
