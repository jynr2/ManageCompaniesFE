import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyModel } from '../models/company-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private uriApi: string = 'https://localhost:44398/api';

  constructor(private http: HttpClient) { }

  SaveCompany(company: CompanyModel): Observable<CompanyModel>{
    return this.http.post<CompanyModel>(`${this.uriApi}/AddCompany`, company);
  }
}
