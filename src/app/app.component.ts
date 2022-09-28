import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserReports } from 'src/userReports';
import { ApiServiceService } from './api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  users: UserReports[] = [];
  open = false;
  pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  constructor(private service: ApiServiceService) {}
  ngOnInit() {
    this.getAllReports();
  }

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.pattern),
    ]),
  });

  // to open dialog box

  openModal() {
    this.open = true;
    // console.log('HI');
  }

  public getAllReports() {
    this.service.userReports().subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }
}
