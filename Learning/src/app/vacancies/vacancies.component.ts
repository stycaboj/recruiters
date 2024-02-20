import { Component, Input, OnInit } from '@angular/core';
import { VacanciesService } from '../../core/services/vacancies.service';
import { VacancyModel } from '../../core/models/vacancy.model';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss',
})
export class VacanciesComponent implements OnInit {
  getIcon(vacancy: VacancyModel): string {
    return vacancy.title.slice(0, 3).toUpperCase();
  }

  getDate(vacancy: VacancyModel): string {
    const startDate = new Date(vacancy.startDate);
    const day = startDate.getDate();
    const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
    const year = startDate.getFullYear();
  
    return `${day}.${month}.${year}`;
  }

  public vacancies: VacancyModel[] = [];

  constructor(private readonly vacanciesService: VacanciesService) { }

  ngOnInit() {
    this.vacanciesService.get().subscribe((data) => {
      this.vacancies = data;
    });
  }
}
