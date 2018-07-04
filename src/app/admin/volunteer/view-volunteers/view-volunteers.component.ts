import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { VolunteerModel } from "../../../interfaces/VolunteerModel";
import { BackEndCalls } from "../../../services/BackendHandling/backend-calls.service";
import { Subject } from 'rxjs';
import { DataStorage } from '../../../services/Providers/DataStorage';
import swal from 'sweetalert2';

@Component({
  selector: 'view-volunteers',
  templateUrl: './view-volunteers.component.html',
  styleUrls: ['./view-volunteers.component.scss']
})
export class ViewVolunteersComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  volunteers: VolunteerModel[] = [];

  dtOptions: any = {};
  dtTrigger: Subject<VolunteerModel> = new Subject();  
  isLoading: boolean = true;
  currentlySelectedCampusId: string;
  campusList;
  isTableLoadingForTheFirstTime: boolean = true;

  constructor(
    private router: Router, 
    private storage: DataStorage,
    private service: BackEndCalls
  ) { }

  ngOnInit() {
    this.dtOptions = {
      responsive: true,
      pagingType: 'full_numbers',
      pageLength: 10
    };

    if(this.storage.campusList == null){
      this.getCampusList();
    }
    else{
      this.campusList = this.storage.campusList;
      this.isLoading = false;   
    }
  }

  getCampusList(){
    this.service.getAllCampuses()
    .subscribe((data: any[]) => {
      this.campusList = data;
      this.storage.campusList = data;
      this.isLoading = false;
    })
  }

  onItemSelect(id){
    this.isLoading = true;
    this.getAllVolunteersOfCampus(id);
    this.currentlySelectedCampusId = id;
  }

  getAllVolunteersOfCampus(id){
    this.service.getAllVolunteers(id)
    .subscribe((data: VolunteerModel[])  => {
      this.volunteers = data;
     
      if(this.isTableLoadingForTheFirstTime){
        this.dtTrigger.next();
        this.isTableLoadingForTheFirstTime = false;
      }
      else
        this.rerenderTable();

      this.isLoading = false;
    });
  }

  deleteVolunteer(id: string){
    //searching id from array and deleting it
    let index = this.volunteers.map(function(x){ return x.id; }).indexOf(id);
    let tempVolunteer = this.volunteers[index];
    this.volunteers.splice(index,1);

    this.rerenderTable();
    
    //Sending delete reques to server
    this.service.deleteVolunteer(this.currentlySelectedCampusId, id)
    .subscribe(data => {
      console.log(data);
    },error => {
      swal('Error','There was an error deleting the volunteer','error');
      this.volunteers.push(tempVolunteer);
    });
  }

  rerenderTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  editVolunteer(volunteer){
    this.storage.volunteer = volunteer;
    this.router.navigate(['/admin/volunteer',volunteer.id], { queryParams: { tab: 'add', edit: 'true', campusId: this.currentlySelectedCampusId} });
  }
}
