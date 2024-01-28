import { Component } from '@angular/core';

@Component({
  selector: 'app-recruiters',
  templateUrl: './recruiters.component.html',
  styleUrl: './recruiters.component.scss',
})
export class RecruitersComponent {
  public recruiters = [
    {
      id: 0,
      fullname: 'Abobus Bibitus',
      number: '+7 (952) 812-52-52',
      mail: 'abobus@gmail.com',
      date: '02.02.2002',
    },
    {
      id: 1,
      fullname: 'Sashok Tennessee',
      number: '322-322',
      mail: 'totsamiychel@advance.samp',
      date: '13.01.2024',
    },
  ];
}
