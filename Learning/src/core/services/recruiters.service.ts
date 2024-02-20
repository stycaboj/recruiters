import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecruiterModel } from '../models/recruiter.model';

@Injectable({
  providedIn: 'root',
})
export class RecruitersService {
  constructor(private readonly httpClient: HttpClient) {}

  public get() {
    return this.httpClient.get<Array<RecruiterModel>>('api/recruiters');
  }
}