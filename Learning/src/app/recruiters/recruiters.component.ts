import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecruitersService } from '../../core/services/recruiters.service';
import { RecruiterModel } from '../../core/models/recruiter.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogRecruitersComponent } from './dialog-recruiters/dialog-recruiters.component';
import { PutRecruitersComponent } from './put-recruiters/put-recruiters.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-recruiters',
  templateUrl: './recruiters.component.html',
  styleUrl: './recruiters.component.scss',
})
export class RecruitersComponent implements OnInit, OnDestroy {
  public recruiters: RecruiterModel[] = [];
  public destroy$ = new Subject();

  constructor(
    private readonly recruitersService: RecruitersService,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.recruitersService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.recruiters = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public openRecruitersDialog(): void {
    const dialogRef = this.dialog.open(DialogRecruitersComponent, {
      width: '400px',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.addRecruiter(result);
        }
      });
  }

  public openPutDialog(recruiter: RecruiterModel): void {
    const dialogRef = this.dialog.open(PutRecruitersComponent, {
      width: '400px',
      data: recruiter, // передача данных редактируемого элемента в попап
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.updateRecruiter(result);
        }
      });
  }

  private addRecruiter(newRecruiter: RecruiterModel): void {
    this.recruitersService
      .post(newRecruiter)
      .pipe(takeUntil(this.destroy$))
      .subscribe((addedRecruiter) => {
        this.recruiters.push(addedRecruiter);
      });
  }

  public deleteRecruiter(recruiter: RecruiterModel): void {
    this.recruiters = this.recruiters.filter((arr) => arr !== recruiter);
    this.recruitersService
      .delete(recruiter.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private updateRecruiter(updatedRecruiter: RecruiterModel): void {
    const index = this.recruiters.findIndex(
      (r) => r.id === updatedRecruiter.id
    );
    if (index !== -1) {
      this.recruitersService
        .put(updatedRecruiter)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.recruiters[index] = updatedRecruiter;
        });
    }
  }
}
