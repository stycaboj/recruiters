import { Component } from '@angular/core';
import { InterviewModel } from '../../core/models/interview.model';
import { InterviewsService } from '../../core/services/interview.service';
import { CandidateModel } from '../../core/models/candidate.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogInterviewsComponent } from './dialog-interviews/dialog-interviews.component';
import { PutInterviewsComponent } from './put-interviews/put-interviews.component';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrl: './interviews.component.scss',
})
export class InterviewsComponent {
  public columnsToDisplay = [
    'vacancy',
    'recruiter',
    'time',
    'candidate',
    'buttons',
  ];

  public interviews: InterviewModel[] = [];

  constructor(
    private readonly interviewsService: InterviewsService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.interviewsService.get().subscribe((data) => {
      this.interviews = data;
    });
  }

  public getSkills(candidate: CandidateModel): string {
    const skills = candidate.skills;
    return skills.join(', ');
  }

  public openInterviewsDialog(): void {
    const dialogRef = this.dialog.open(DialogInterviewsComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addInterview(result);
      }
    });
  }

  public openPutDialog(interview: InterviewModel): void {
    const dialogRef = this.dialog.open(PutInterviewsComponent, {
      width: '400px',
      data: interview, // передача данных редактируемого элемента в попап
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateInterview(result);
      }
    });
  }

  private addInterview(newInterview: InterviewModel): void {
    this.interviewsService.post(newInterview).subscribe((addedInterview) => {
      this.interviews.push(addedInterview);
    });
  }

  public deleteInterview(interview: InterviewModel): void {
    this.interviews = this.interviews.filter(arr => arr !== interview)
    this.interviewsService.delete(interview.id).subscribe();
  }

  private updateInterview(updatedInterview: InterviewModel): void {
    const index = this.interviews.findIndex(
      (i) => i.id === updatedInterview.id
    );
    if (index !== -1) {
      this.interviewsService.put(updatedInterview).subscribe(() => {
        this.interviews[index] = updatedInterview;
      });
    }
  }
}
