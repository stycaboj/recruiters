import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InterviewModel } from '../../../core/models/interview.model';
import { CandidateModel } from '../../../core/models/candidate.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-interviews',
  templateUrl: './list-interviews.component.html',
  styleUrl: './list-interviews.component.scss'
})
export class ListInterviewsComponent {
  @Input() interviews?: Array<InterviewModel> | null;
  @Input() columnsToDisplay?: Array<string> | null;
  @Output() deletedInterview = new EventEmitter<InterviewModel>();
  @Output() updatedInterview = new EventEmitter<InterviewModel>();
  


  public deleteInterview(deletedInterview: InterviewModel): void {
    this.deletedInterview.emit(deletedInterview);
  }

  public updateInterview(updatedInterview: InterviewModel): void {
    this.updatedInterview.emit(updatedInterview);
  }

  public getSkills(candidate: CandidateModel): string {
    const skills = candidate.skills;
    return skills.join(', ');
  }
}
