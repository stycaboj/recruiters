import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CandidatesService } from '../../core/services/candidates.service';
import { CandidateModel } from '../../core/models/candidate.model';
import { DialogCandidatesComponent } from './dialog-candidates/dialog-candidates.component';
import { PutCandidatesComponent } from './put-candidates/put-candidates.component';
import {
  BehaviorSubject,
  filter,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesComponent implements OnInit, OnDestroy {
  public candidates$ = new BehaviorSubject<Array<CandidateModel> | null>(null);
  private destroy$ = new Subject();

  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly dialog: MatDialog,
    private readonly spinner: NgxSpinnerService
  ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.getCandidatesList();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public getCandidatesList(): void {
    this.candidatesService
      .get()
      .pipe(
        takeUntil(this.destroy$),
        tap((item) => {
          if (item) {
            this.spinner.hide();
          }
        })
      )
      .subscribe((items) => this.candidates$.next(items));
  }

  public openCandidatesDialog(): void {
    const dialogRef = this.dialog.open(DialogCandidatesComponent, {
      data: {
        candidates$: this.candidates$,
      },
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
    this.spinner.show();
    this.candidatesService
      .post(newCandidate)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getCandidatesList();
      });
  }

  public deleteCandidate(deletedCandidate: CandidateModel): void {
    this.spinner.show();
    this.candidatesService
      .delete(deletedCandidate.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getCandidatesList();
      });
  }

  private updateCandidate(updatedCandidate: CandidateModel): void {
    this.spinner.show();
    this.candidatesService
      .put(updatedCandidate)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getCandidatesList();
      });
  }
}
