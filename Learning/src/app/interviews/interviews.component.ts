import { Component } from '@angular/core';
import { InterviewModel } from '../../core/models/interview.model';
import { InterviewsService } from '../../core/services/interview.service';
import { VacancyModel } from '../../core/models/vacancy.model';
import { CandidateModel } from '../../core/models/candidate.model';

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

  constructor(private readonly interviewsService: InterviewsService) { }

  ngOnInit() {
    this.interviewsService.get().subscribe((data) => {
      this.interviews = data;
    });
  }

  getDate(vacancy: VacancyModel): string {
    const startDate = new Date(vacancy.startDate);
    const day = startDate.getDate();
    const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
    const year = startDate.getFullYear();
  
    return `${day}.${month}.${year}`;
  }

  getTime(vacancy: VacancyModel): string {
    const startDate = new Date(vacancy.startDate);
    const hour = (startDate.getHours()).toString().padStart(2, '0');
    const min = startDate.getMinutes();
  
    return `${hour}:${min}`;
  }

  getSkills(candidate: CandidateModel) {
    const skills = candidate.skills;
    return skills.join(', ');
  }
}
