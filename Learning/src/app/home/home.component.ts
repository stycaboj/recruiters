import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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

  public vacancies = [
    {
      id: 0,
      name: 'Looking for a 3 pos in BB Team',
      description: 'Resolution',
    },
    {
      id: 1,
      name: 'Angular Junior Developer',
      description: 'Salary 1000$',
    },
    {
      id: 2,
      name: '1C Developer',
      description: '25.000 RUB',
    }
  ]
}
