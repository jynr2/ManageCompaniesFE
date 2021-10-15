import { Injectable } from '@angular/core';
import { HttpClient } from '@Angular/common/http'
import { Observable } from 'rxjs';
import { IdentificationTypeModel } from '../models/identification-type-model';

@Injectable({
  providedIn: 'root'
})
export class IdentificationTypeServiceService {

  private uriApi: string = 'https://localhost:44398/api';

  constructor(private http : HttpClient) { }

  GetAllIdentificationType(){
    return this.http.get<IdentificationTypeModel[]>(`${this.uriApi}/GetIdentificationType`)
  }
}
