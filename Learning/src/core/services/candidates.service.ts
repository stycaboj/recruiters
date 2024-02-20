import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CandidateModel } from '../models/candidate.model';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  constructor(private readonly httpClient: HttpClient) {}

  public get() {
    return this.httpClient.get<Array<CandidateModel>>('api/candidates');
  }
}