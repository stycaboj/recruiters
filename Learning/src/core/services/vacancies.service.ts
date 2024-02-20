import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VacancyModel } from '../models/vacancy.model';

@Injectable({
  providedIn: 'root',
})
export class VacanciesService {
  constructor(private readonly httpClient: HttpClient) {}

  public get() {
    return this.httpClient.get<Array<VacancyModel>>('api/vacancies');
  }
}