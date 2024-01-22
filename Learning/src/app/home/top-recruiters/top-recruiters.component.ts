import { Component } from '@angular/core';

@Component({
  selector: 'app-top-recruiters',
  templateUrl: './top-recruiters.component.html',
  styleUrl: './top-recruiters.component.scss'
})
export class TopRecruitersComponent {

  public recruiters = [
    {
      id: 0,
      name: 'Alex de Murzenko',
      description: 'Mentor'
    },
    {
      id: 1,
      name: 'Volosatiy',
      description: 'Trainee'
    },
    {
      id: 2,
      name: 'Big Baby Tape',
      description: 'VARSKVA'
    },
  ]
}
