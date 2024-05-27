import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RecruiterModel } from '../../../core/models/recruiter.model';

@Component({
  selector: 'app-list-recruiters',
  templateUrl: './list-recruiters.component.html',
  styleUrl: './list-recruiters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListRecruitersComponent {
  @Input() public recruiters?: Array<RecruiterModel> | null;
  @Output() public deletedRecruiter = new EventEmitter<RecruiterModel>();
  @Output() public updatedRecruiter = new EventEmitter<RecruiterModel>();

  public deleteRecruiter(deletedRecruiter: RecruiterModel): void {
    this.deletedRecruiter.emit(deletedRecruiter);
  }
  public updateRecruiter(updatedRecruiter: RecruiterModel): void {
    this.updatedRecruiter.emit(updatedRecruiter);
  }
}
