import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterviewModel } from '../models/interview.model';

@Injectable({
  providedIn: 'root',
})
export class InterviewsService {
  constructor(private readonly httpClient: HttpClient) {}

  public get() {
    return this.httpClient.get<Array<InterviewModel>>('api/interviews');
  }
}