import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeniorityModel } from '../models/seniority.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SenioritiesService {
  constructor(private readonly httpClient: HttpClient) {}

  public get(): Observable<Array<SeniorityModel>> {
    return this.httpClient.get<Array<SeniorityModel>>('api/seniorities');
  }
}