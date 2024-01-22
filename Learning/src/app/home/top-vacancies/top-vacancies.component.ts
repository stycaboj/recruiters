import { Component } from '@angular/core';

@Component({
  selector: 'app-top-vacancies',
  templateUrl: './top-vacancies.component.html',
  styleUrl: './top-vacancies.component.scss'
})

export class TopVacanciesComponent {
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
