import { Component } from '@angular/core';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent {
  public candidates = [
    {
      id: 0,
      fullname: 'Harry Potter',
      number: '+7 (952) 812-52-52',
      mail: 'abobus@gmail.com',
      date: '02.02.2002',
      tags: ['HTML', 'CSS', 'JavaScript', 'Angular'],
    },
    {
      id: 1,
      fullname: 'Jerald Lewis',
      number: '+7 (952) 812-52-52',
      mail: 'j.lewis@gmail.com',
      date: '01.09.2016',
      tags: ['C#'],
    }
  ]
}
