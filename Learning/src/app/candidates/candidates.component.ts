import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CandidatesService } from '../../core/services/candidates.service';
import { CandidateModel } from '../../core/models/candidate.model';
import { DialogCandidatesComponent } from './dialog-candidates/dialog-candidates.component';
import { PutCandidatesComponent } from './put-candidates/put-candidates.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss',
})
export class CandidatesComponent implements OnInit, OnDestroy {
  public candidates: CandidateModel[] = [];
  public destroy$ = new Subject();

  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.candidatesService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.candidates = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public openCandidatesDialog(): void {
    const dialogRef = this.dialog.open(DialogCandidatesComponent, {
      width: '400px',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.addCandidate(result);
        }
      });
  }

  public openPutDialog(candidate: CandidateModel): void {
    const dialogRef = this.dialog.open(PutCandidatesComponent, {
      width: '400px',
      data: candidate, // передача данных редактируемого элемента в попап
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.updateCandidate(result);
        }
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
    this.candidates = this.candidates.filter((arr) => arr !== candidate);
    this.candidatesService
      .delete(candidate.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private updateCandidate(updatedCandidate: CandidateModel): void {
    const index = this.candidates.findIndex(
      (c) => c.id === updatedCandidate.id
    );
    if (index !== -1) {
      this.candidatesService
        .put(updatedCandidate)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.candidates[index] = updatedCandidate;
        });
    }
  }
}
