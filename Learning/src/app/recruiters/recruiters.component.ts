import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RecruitersService } from '../../core/services/recruiters.service';
import { RecruiterModel } from '../../core/models/recruiter.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogRecruitersComponent } from './dialog-recruiters/dialog-recruiters.component';
import { PutRecruitersComponent } from './put-recruiters/put-recruiters.component';
import { filter, Subject, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recruiters',
  templateUrl: './recruiters.component.html',
  styleUrl: './recruiters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecruitersComponent implements OnInit, DoCheck, OnDestroy {
  public recruiters: RecruiterModel[] = [];
  private destroy$ = new Subject();

  constructor(
    private readonly recruitersService: RecruitersService,
    private readonly dialog: MatDialog,
    private readonly spinner: NgxSpinnerService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.recruitersService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.spinner.hide();
        this.recruiters = data;
      });
  }

  public ngDoCheck(): void {
    console.log('DoCheck');
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public openRecruitersDialog(): void {
    const dialogRef = this.dialog.open(DialogRecruitersComponent, {
      width: '25rem',
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter((item) => item)
      )
      .subscribe((result) => {
        this.addRecruiter(result);
      });
  }

  public openPutDialog(recruiter: RecruiterModel): void {
    const dialogRef = this.dialog.open(PutRecruitersComponent, {
      width: '25rem',
      data: recruiter, // передача данных редактируемого элемента в попап
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter((item) => item)
      )
      .subscribe((result) => {
        this.updateRecruiter(result);
      });
  }

  private addRecruiter(newRecruiter: RecruiterModel): void {
    this.recruitersService
      .post(newRecruiter)
      .pipe(takeUntil(this.destroy$))
      .subscribe((addedRecruiter) => {
        this.recruiters = [...this.recruiters, addedRecruiter];
      });
  }

  public deleteRecruiter(recruiter: RecruiterModel): void {
    this.recruiters = this.recruiters.filter((item) => item !== recruiter);
    this.recruitersService
      .delete(recruiter.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private updateRecruiter(updatedRecruiter: RecruiterModel): void {
    let index = 0;
    const recruiter = this.recruiters.find((item, recruiterIndex) => {
      if (item.id === updatedRecruiter.id) {
        index = recruiterIndex;
      }
      return item.id === updatedRecruiter.id;
    });
    if (recruiter) {
      this.recruitersService
        .put(updatedRecruiter)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.recruiters[index] = updatedRecruiter;
        });
    }
  }
}
