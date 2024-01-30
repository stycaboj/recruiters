import { Component } from '@angular/core';
import { InterviewModel } from '../../core/models/interview.model';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrl: './interviews.component.scss'
})
export class InterviewsComponent {
  getIcon(interview: InterviewModel): string {
    return interview.vacancyTitle.slice(0, 3).toUpperCase();
  }

  public columnsToDisplay = [
    'vacancy',
    'recruiter',
    'time',
    'candidate',
    'buttons'
  ];

  public interviews: InterviewModel[] = [
    {
      id: 0,
      vacancyTitle: 'Looking for boxer',
      vacancyDescription: 'Rezim',
      recruiterTitle: 'Vladimir Ivanov',
      recruiterDescription: 'Box',
      timeTitle: '15:55',
      timeDescription: '30/01/2024',
      candidateTitle: 'Muhammad Ali',
      candidateDescription: 'Legend'
    },
    {
      id: 1,
      vacancyTitle: 'Looking for Junior Angular Developer',
      vacancyDescription: 'JS, TS, HTML, CSS, Angular, Material',
      recruiterTitle: 'Oleg Tinkov',
      recruiterDescription: 'Tinkoff',
      timeTitle: '12:21',
      timeDescription: '30/02/2024',
      candidateTitle: 'Artem Golubev',
      candidateDescription: 'Plastilin'
    },
    {
      id: 2,
      vacancyTitle: 'Looking for programmer',
      vacancyDescription: 'JavaSquirt',
      recruiterTitle: 'Oleg Tinkov',
      recruiterDescription: 'Tinkoff',
      timeTitle: '22:22',
      timeDescription: '30/01/2024',
      candidateTitle: 'Bobu Mobungo',
      candidateDescription: 'Lokamopa'
    },
    {
      id: 3,
      vacancyTitle: 'Searching for programmer',
      vacancyDescription: 'JS',
      recruiterTitle: 'Recruiter Alopiter',
      recruiterDescription: 'Google',
      timeTitle: '22:22',
      timeDescription: '30/01/2024',
      candidateTitle: 'Toto Maposore',
      candidateDescription: 'Akrompa'
    },
  ]
}
