import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeModel } from '../models/type.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TypesService {
  constructor(private readonly httpClient: HttpClient) {}

  public get():Observable<Array<TypeModel>> {
    return this.httpClient.get<Array<TypeModel>>('api/types');
  }
}