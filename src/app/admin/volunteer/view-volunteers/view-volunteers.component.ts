import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { VolunteerModel } from "../../../interfaces/VolunteerModel";
import { BackEndCalls } from "../../../services/BackendHandling/backend-calls.service";
import { Subject } from 'rxjs';


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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: BackEndCalls) { }

  ngOnInit() {
    this.dtOptions = {
      responsive: true,
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.service.getAllVolunteers()
    .subscribe((data: VolunteerModel[])  => {
      this.volunteers = data;
      this.dtTrigger.next();
      this.isLoading = false;
    });

  }

  deleteVolunteer(id: string){
    //searching id from array and deleting it
    let index = this.volunteers.map(function(x){ return x.id; }).indexOf(id);
    this.volunteers.splice(index,1);

    this.rerenderTable();
    
    //Sending delete reques to server
    this.service.deleteVolunteer(id)
    .subscribe(data => {
      console.log(data);
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

  editVolunteer(id: string){
    
    console.log(id);
  
    this.router.navigate(['/admin/volunteer',id], { queryParams: { tab: 'add', edit: 'true'} });
  }
}
