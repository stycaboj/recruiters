import { Component } from '@angular/core';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss',
})

export class VacanciesComponent {
  public vacancies = [
    {
      id: 0,
      icon: 'TSP',
      name: 'Team Spirit looking professional PUDGE',
      seniority: 'Senior',
      status: true,
      salary: '5000',
      date: '28/02/2004',
      type: 'Regular',
      description: "Ja s'el Invokera s pomos'u Dismembera",
    },
    {
      id: 1,
      icon: 'AJD',
      name: 'Company looking for a Angular Junior Developer',
      seniority: 'Junior',
      status: true,
      salary: '1000',
      date: '10/01/2024',
      type: 'Regular',
      description: "Aboba",
    },
    // {
    //   id: 2,
    //   icon: 'SSS',
    //   name: 'Vacancy',
    //   seniority: 'Junior',
    //   status: true,
    //   salary: '10000',
    //   date: '01/01/2024',
    //   type: 'Regular',
    //   description: "Description",
    // },
    // {
    //   id: 3,
    //   icon: 'SSS',
    //   name: 'Vacancy',
    //   seniority: 'Junior',
    //   status: true,
    //   salary: '10000',
    //   date: '01/01/2024',
    //   type: 'Regular',
    //   description: "Description",
    // },
  ]
}