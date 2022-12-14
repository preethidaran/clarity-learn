import { Component, EventEmitter, Output } from '@angular/core';
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
  selected: any;
  openEditModal = false;
  value!: string;

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
    gender: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  // to open dialog box
  openModal() {
    this.open = true;
    this.userForm.patchValue({
      name: this.selected.name,
      email: this.selected.email,
      gender: this.selected.gender,
      status: this.selected.status,
    });
  }

  edit() {
    this.userForm.setValue({
      name: this.selected.name,
      email: this.selected.email,
      gender: this.selected.gender,
      status: this.selected.status,
    });
    this.open = false;
  }

  public getAllReports() {
    this.service.userReports().subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }

  //to add value

  addUser(name: string, email: string, status: string, gender: string) {
    this.users.push({
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

  // to get every changed action input from the field

  sendTheNewValue(event: any) {
    this.value = event.target.value;
    console.log(this.value);
  }
}
