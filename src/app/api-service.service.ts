import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserReports } from 'src/userReports';
import { SpaceCrafts } from 'src/spacecrafts';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}
  public spaceReports() {
    return this.http.get<SpaceCrafts>(
      'https://isro.vercel.app/api/spacecrafts'
    );
  }

  public userReports() {
    return this.http.get<UserReports[]>('https://gorest.co.in/public/v2/users');
  }
}
