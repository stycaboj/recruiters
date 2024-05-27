import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CandidateModel } from '../../../core/models/candidate.model';

@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrl: './list-candidates.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCandidatesComponent {
  @Input() public candidates?: Array<CandidateModel> | null;
  @Output() public deletedCandidate = new EventEmitter<CandidateModel>();
  @Output() public updatedCandidate = new EventEmitter<CandidateModel>();

  public deleteCandidate(deletedCandidate: CandidateModel): void {
    this.deletedCandidate.emit(deletedCandidate);
  }
  public updateCandidate(updatedCandidate: CandidateModel): void {
    this.updatedCandidate.emit(updatedCandidate);
  }
}
