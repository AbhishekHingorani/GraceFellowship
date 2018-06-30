import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { MemberModel } from "../../../interfaces/MemberModel";
import { BackEndCalls } from "../../../services/BackendHandling/backend-calls.service";
import { DataStorage } from "../../../services/Providers/DataStorage";
import { Subject } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'view-members',
  templateUrl: './view-members.component.html',
  styleUrls: ['./view-members.component.scss']
})
export class ViewMembersComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  members: MemberModel[] = [];
  
  dtOptions: any = {};
  dtTrigger: Subject<MemberModel> = new Subject();  
  campusList;
  currentlySelectedCampusId: string;
  isLoading: boolean = true;
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
    this.fetchBatchMembers(id);
    this.currentlySelectedCampusId = id;
  }

  fetchBatchMembers(id){
    this.service.getBatchMembersOfCampus(id)
    .subscribe((data: MemberModel[]) => {
      //this.members = JSON.parse(JSON.stringify(data)).batch_members;
      this.members = data;
      console.log(this.members);
      
      if(this.isTableLoadingForTheFirstTime){
        this.dtTrigger.next();
        this.isTableLoadingForTheFirstTime = false;
      }
      else
        this.rerenderTable();

      this.isLoading = false;
    },
    error => {
      this.isLoading = false;
      swal('Error', 'Some error occured fetching the data..', 'error');
    });
  }

  deleteMember(id: string){
    //searching id from array and deleting it
    let index = this.members.map(function(x){ return x.id; }).indexOf(id);
    this.members.splice(index,1);

    this.rerenderTable();
    
    //Sending delete request to server
    this.service.deleteMember(this.currentlySelectedCampusId, id)
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

  editMember(member){
    this.storage.member = member;
    this.router.navigate(['/admin/member',member.id], { queryParams: { tab: 'add', edit: 'true', campusId: this.currentlySelectedCampusId} });
  }
}
