import { Component } from '@angular/core';
import { DatagridCellRenderer } from '@clr/angular/data/datagrid/render/cell-renderer';
import { Observable } from 'rxjs';
import { UserReports } from 'src/userReports';
import { ApiServiceService } from './api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  users: UserReports[] = [];

  constructor(private service: ApiServiceService) {}
  ngOnInit() {
    this.getAllReports();
  }

  public getAllReports() {
    this.service.userReports().subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }
}
