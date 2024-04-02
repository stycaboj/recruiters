import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VacancyModel } from '../models/vacancy.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VacanciesService {
  constructor(private readonly httpClient: HttpClient) {}

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public get(): Observable<Array<VacancyModel>> {
    return this.httpClient.get<Array<VacancyModel>>('api/vacancies');
  }

  public getById(id: number): Observable<VacancyModel> {
    return this.httpClient.get<VacancyModel>(`api/vacancies/${id}`);
  }

  public post(newVacancy: VacancyModel): Observable<VacancyModel> {
    return this.httpClient.post<VacancyModel>(
      'api/vacancies',
      newVacancy,
      this.httpOptions
    );
  }

  public delete(id: number): Observable<VacancyModel> {
    return this.httpClient.delete<VacancyModel>(
      `api/vacancies/${id}`,
      this.httpOptions
    )
  }

  public put(vacancy: VacancyModel): Observable<VacancyModel> {
    return this.httpClient.put<VacancyModel>(
      'api/vacancies',
      vacancy,
      this.httpOptions
    )
  }
}