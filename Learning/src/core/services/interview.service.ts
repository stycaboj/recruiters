import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterviewModel } from '../models/interview.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterviewsService {
  constructor(private readonly httpClient: HttpClient) {}

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public get(): Observable<Array<InterviewModel>> {
    return this.httpClient.get<Array<InterviewModel>>('api/interviews');
  }

  public post(newInterview: InterviewModel): Observable<InterviewModel> {
    return this.httpClient.post<InterviewModel>(
      'api/interviews',
      newInterview,
      this.httpOptions
    );
  }

  public delete(id: number): Observable<InterviewModel> {
    return this.httpClient.delete<InterviewModel>(
      `api/interviews/${id}`,
      this.httpOptions
    );
  }
  
  public put(interview: InterviewModel): Observable<InterviewModel> {
    return this.httpClient.put<InterviewModel>(
      'api/interviews',
      interview,
      this.httpOptions
    )
  }
}
