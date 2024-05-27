import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RecruitersService } from '../../core/services/recruiters.service';
import { RecruiterModel } from '../../core/models/recruiter.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogRecruitersComponent } from './dialog-recruiters/dialog-recruiters.component';
import { PutRecruitersComponent } from './put-recruiters/put-recruiters.component';
import { BehaviorSubject, filter, Subject, takeUntil, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recruiters',
  templateUrl: './recruiters.component.html',
  styleUrl: './recruiters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecruitersComponent implements OnInit, OnDestroy {
  public recruiters$ = new BehaviorSubject<Array<RecruiterModel> | null>(null);
  private destroy$ = new Subject();

  constructor(
    private readonly recruitersService: RecruitersService,
    private readonly dialog: MatDialog,
    private readonly spinner: NgxSpinnerService
  ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.getRecruitersList();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private getRecruitersList(): void {
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
  }

  public openRecruitersDialog(): void {
    const dialogRef = this.dialog.open(DialogRecruitersComponent, {
      data: {
        recruiters$: this.recruiters$,
      },
      width: '25rem',
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter((item) => !!item)
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
        filter((item) => !!item)
      )
      .subscribe((result) => {
        this.updateRecruiter(result);
      });
  }

  private addRecruiter(newRecruiter: RecruiterModel): void {
    this.spinner.show();
    this.recruitersService
      .post(newRecruiter)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getRecruitersList();
      });
  }

  public deleteRecruiter(deletedRecruiter: RecruiterModel): void {
    this.spinner.show();
    this.recruitersService
      .delete(deletedRecruiter.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getRecruitersList();
      });
  }

  public updateRecruiter(updatedRecruiter: RecruiterModel): void {
    this.spinner.show();
    this.recruitersService
      .put(updatedRecruiter)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getRecruitersList();
      });
  }
}
