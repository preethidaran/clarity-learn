import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpaceCrafts } from 'src/spacecrafts';
import { UserReports } from 'src/userReports';
import { ApiServiceService } from './api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  users: UserReports[] = [];
  spaceCrafts: SpaceCrafts[] = [];
  open = false;
  pattern = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$';
  list: any[] = [];
  id: number = 3530;
  displayProgressSpinner = false;

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

  // public getAllSpaceReports() {
  //   this.service.spaceReports().subscribe((data) => {
  //     console.log(data);
  //     // this.spaceCrafts = data;
  //   });
  // }

  public getAllReports() {
    this.service.userReports().subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }

  //to add values

  addItem(name: string, email: string, status: string, gender: string) {
    this.list.push({
      id: (this.id -= 1),
      name: name,
      email: email,
      gender: gender,
      status: status,
    });
    this.open = false;
  }

  //to show spinner

  showSpin() {
    this.displayProgressSpinner = true;
    this.service.userReports().subscribe((data) => {
      console.log(data);
      this.users = data;
      this.displayProgressSpinner = false;
      console.log('HI');
    });
  }
}
