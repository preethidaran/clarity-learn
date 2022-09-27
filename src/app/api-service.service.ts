import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserReports } from 'src/userReports';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  public userReports() {
    return this.http.get<UserReports[]>('https://gorest.co.in/public/v2/users');
  }
}
