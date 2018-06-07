import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackEndCalls } from "../../../services/BackendHandling/backend-calls.service";

declare interface VolunteerData{
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  contact: string;
}

@Component({
  selector: 'view-volunteers',
  templateUrl: './view-volunteers.component.html',
  styleUrls: ['./view-volunteers.component.scss']
})
export class ViewVolunteersComponent implements OnInit {

  constructor(private router: Router, private service: BackEndCalls) { }

  ngOnInit() {
  }
}
