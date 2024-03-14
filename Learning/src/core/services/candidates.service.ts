import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CandidateModel } from '../models/candidate.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  constructor(private readonly httpClient: HttpClient) {}

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public get(): Observable<Array<CandidateModel>> {
    return this.httpClient.get<Array<CandidateModel>>('api/candidates');
  }

  public post(newCandidate: CandidateModel): Observable<CandidateModel> {
    return this.httpClient.post<CandidateModel>(
      'api/candidates',
      newCandidate,
      this.httpOptions
    );
  }

  public delete(id: number): Observable<CandidateModel> {
    return this.httpClient.delete<CandidateModel>(
      `api/candidates/${id}`,
      this.httpOptions
    )
  }

  public put(candidate: CandidateModel): Observable<CandidateModel> {
    return this.httpClient.put<CandidateModel>(
      'api/candidates',
      candidate,
      this.httpOptions
    )
  }
}
