import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CandidatesService } from '../../core/services/candidates.service';
import { CandidateModel } from '../../core/models/candidate.model';
import { DialogCandidatesComponent } from './dialog-candidates/dialog-candidates.component';
import { PutCandidatesComponent } from './put-candidates/put-candidates.component';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss',
})
export class CandidatesComponent {
  public candidates: CandidateModel[] = [];

  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.candidatesService.get().subscribe((data) => {
      this.candidates = data;
    });
  }

  public openCandidatesDialog(): void {
    const dialogRef = this.dialog.open(DialogCandidatesComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateCandidate(result);
      }
    });
  }

  private addCandidate(newCandidate: CandidateModel): void {
    this.candidatesService.post(newCandidate).subscribe((addedCandidate) => {
      this.candidates.push(addedCandidate);
    });
  }

  public deleteCandidate(candidate: CandidateModel): void {
    this.candidates = this.candidates.filter(arr => arr !== candidate)
    this.candidatesService.delete(candidate.id).subscribe();
  }

  private updateCandidate(updatedCandidate: CandidateModel): void {
    const index = this.candidates.findIndex(
      (c) => c.id === updatedCandidate.id
    );
    if (index !== -1) {
      this.candidatesService.put(updatedCandidate).subscribe(() => {
        this.candidates[index] = updatedCandidate;
      });
    }
  }
}
