import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CandidatesService } from '../../core/services/candidates.service';
import { CandidateModel } from '../../core/models/candidate.model';
import { DialogCandidatesComponent } from './dialog-candidates/dialog-candidates.component';
import { PutCandidatesComponent } from './put-candidates/put-candidates.component';
import { filter, Subject, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss',
})
export class CandidatesComponent implements OnInit, OnDestroy {
  public candidates: CandidateModel[] = [];
  private destroy$ = new Subject();

  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly dialog: MatDialog,
    private readonly spinner: NgxSpinnerService
  ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.candidatesService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.spinner.hide();
        this.candidates = data;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public openCandidatesDialog(): void {
    const dialogRef = this.dialog.open(DialogCandidatesComponent, {
      width: '25rem',
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter((item) => item) // вместо if
      )
      .subscribe((result) => {
        this.addCandidate(result);
      });
  }

  public openPutDialog(candidate: CandidateModel): void {
    const dialogRef = this.dialog.open(PutCandidatesComponent, {
      width: '25rem',
      data: candidate, // передача данных редактируемого элемента в попап
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter((item) => item)
      )
      .subscribe((result) => {
        this.updateCandidate(result);
      });
  }

  private addCandidate(newCandidate: CandidateModel): void {
    this.candidatesService
      .post(newCandidate)
      .pipe(takeUntil(this.destroy$))
      .subscribe((addedCandidate) => {
        this.candidates.push(addedCandidate);
      });
  }

  public deleteCandidate(candidate: CandidateModel): void {
    this.candidates = this.candidates.filter((item) => item !== candidate);
    this.candidatesService
      .delete(candidate.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private updateCandidate(updatedCandidate: CandidateModel): void {
    let index = 0;
    const candidate = this.candidates.find((item, candidateIndex) => {
      if (item.id === updatedCandidate.id) {
        index = candidateIndex;
      }
      return item.id === updatedCandidate.id;
    });
    if (candidate) {
      this.candidatesService
        .put(updatedCandidate)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.candidates[index] = updatedCandidate;
        });
    }
  }
}
