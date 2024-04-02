import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecruiterModel } from '../models/recruiter.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecruitersService {
  constructor(private readonly httpClient: HttpClient) {}

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public get(): Observable<Array<RecruiterModel>> {
    return this.httpClient.get<Array<RecruiterModel>>('api/recruiters');
  }

  public post(newRecruiter: RecruiterModel): Observable<RecruiterModel> {
    return this.httpClient.post<RecruiterModel>(
      'api/recruiters',
      newRecruiter,
      this.httpOptions
    );
  }

  public delete(id: number): Observable<RecruiterModel> {
    return this.httpClient.delete<RecruiterModel>(
      `api/recruiters/${id}`,
      this.httpOptions
    )
  }

  public put(recruiter: RecruiterModel): Observable<RecruiterModel> {
    return this.httpClient.put<RecruiterModel>(
      'api/recruiters',
      recruiter,
      this.httpOptions
    )
  }
}