import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { InterviewModel } from '../models/interview.model';
import { RecruiterModel } from '../models/recruiter.model';
import { VacancyModel } from '../models/vacancy.model';
import { CandidateModel } from '../models/candidate.model';
import { SeniorityModel } from '../models/seniority.model';
import { TypeModel } from '../models/type.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CustomInMemoryDbService implements InMemoryDbService {
  public createDb() {
    const recruiters: Array<RecruiterModel> = [
      {
        id: 0,
        firstName: 'Aleksandr',
        lastName: 'Morozov',
        phone: '+380 67 496-77-92',
        email: 'saniok6652@gmail.com',
        birthday: new Date('2001, 9, 18'),
        image: '../../assets/img/image0.jpg'
      },
      {
        id: 1,
        firstName: 'Fogo',
        lastName: 'Mogobun',
        phone: '+7 (812) 495-66-66',
        email: 'bobongo@gmail.com',
        birthday: new Date('2002, 2, 20'),
        image: '../../assets/img/image1.jpg'
      },
      {
        id: 2,
        firstName: 'Oleg',
        lastName: 'Tinkov',
        phone: '+7 (495) 999-99-99',
        email: 'tinkoff@gmail.com',
        birthday: new Date('1967, 12, 25'),
        image: '../../assets/img/tinkov.jpg'
      },
    ];

    const vacancies: Array<VacancyModel> = [
      {
        id: 0,
        title: 'Junior Angular Developer',
        seniority: 'Junior',
        salary: 1000,
        startDate: new Date(),
        type: 'Regular',
        description: 'Development of projects',
        recruiter: 0,
      },
      {
        id: 1,
        title: 'Middle Angular Developer',
        seniority: 'Middle',
        salary: 2500,
        startDate: new Date(),
        type: 'Part-time',
        description: 'Development of projects',
        recruiter: 1,
      },
      {
        id: 2,
        title: 'Senior Angular Developer',
        seniority: 'Senior',
        salary: 5000,
        startDate: new Date(),
        type: 'Regular',
        description: 'Development of projects',
        recruiter: 2,
      },
    ];

    const candidates: Array<CandidateModel> = [
      {
        id: 0,
        firstName: 'Artem',
        lastName: 'Golubev',
        phone: '+7 (951) 914-95-06',
        email: 'artmglbv@gmail.com',
        birthday: new Date('2004, 2, 28'),
        image: '../../assets/img/image3.jpg',
        skills: ['HTML', 'CSS', 'JS', 'Angular'],
      },
      {
        id: 1,
        firstName: 'Harry',
        lastName: 'Potter',
        phone: '+7 (952) 812-52-52',
        email: 'harry_potter@gmail.com',
        birthday: new Date('1980, 7, 31'),
        image: '../../assets/img/harry.jpg',
        skills: ['.NET', 'Angular'],
      },
      {
        id: 2,
        firstName: 'Jerald',
        lastName: 'Lewis',
        phone: '+7 (952) 812-52-52',
        email: 'j.lewis@gmail.com',
        birthday: new Date('2016, 9, 1'),
        image: '../../assets/img/image5.jpg',
        skills: ['C#', 'SAMP'],
      },
      {
        id: 3,
        firstName: 'Vladislav',
        lastName: 'Fadeev',
        phone: '+7 (920) 028-37-43',
        email: 'fadeevvlad2003@gmail.com',
        birthday: new Date('2003, 9, 15'),
        image: '../../assets/img/vlad.jpg',
        skills: ['HTML', 'Python', 'JavaScript', 'Sass', 'Git', 'PostgreSQL', 'React.js', 'TailwindCSS', 'Express.js', 'Next.js', 'SQL', 'MySQL'],
      }
    ];

    const interviews: Array<InterviewModel> = [
      {
        id: 0,
        vacancy: vacancies[0],
        recruiter: recruiters[0],
        candidate: candidates[0],
        dateTime: new Date(),
      },
      {
        id: 1,
        vacancy: vacancies[1],
        recruiter: recruiters[1],
        candidate: candidates[1],
        dateTime: new Date(),
      },
      {
        id: 2,
        vacancy: vacancies[2],
        recruiter: recruiters[2],
        candidate: candidates[2],
        dateTime: new Date(),
      },
    ];

    const seniorities: Array<SeniorityModel> = [
      {
        id: 0,
        name: 'Trainee',
      },
      {
        id: 1,
        name: 'Junior',
      },
      {
        id: 2,
        name: 'Middle',
      },
      {
        id: 3,
        name: 'Senior',
      }
    ];

    const types: Array<TypeModel> = [
      {
        id: 0,
        name: 'Part-time',
      },
      {
        id: 1,
        name: 'Regular',
      },
    ];

    const users: Array<UserModel> = [
      {
        id: 0,
        login: 'stycaboj',
        password: 'force',
        firstName: 'Artem',
        lastName: 'Golubev',
        image: '../../assets/img/image3.jpg',
      },
      {
        id: 1,
        login: 'sashok',
        password: 'success',
        firstName: 'Aleksandr',
        lastName: 'Morozov',
        image: '../../assets/img/image0.jpg',
      },
    ]

    return {
      recruiters,
      candidates,
      vacancies,
      interviews,
      seniorities,
      types,
      users
    };
  }
}
