import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { MemberModel } from "../../../interfaces/MemberModel";
import { BackEndCalls } from "../../../services/BackendHandling/backend-calls.service";
import { Subject } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
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
  campusList = [];
  currentlySelectedCampusId: string;
  settings = {};
  isLoading: boolean = true;
  isTableLoadingForTheFirstTime: boolean = true;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: BackEndCalls) { }

  ngOnInit() {
    this.dtOptions = {
      responsive: true,
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.service.getAllCampuses()
    .subscribe(data => {
      this.campusList = JSON.parse(JSON.stringify(data).split('"name":').join('"itemName":'));
      this.settings = {singleSelection: true, text:"Select Campus"};
      this.isLoading = false;
      console.log(this.campusList);
    })
  }
    
  onItemSelect(item:any){
    this.isLoading = true;
    this.fetchBatchMembers(item.id);
    this.currentlySelectedCampusId = item.id;
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

  editMember(id: string){
    
    console.log(id);
  
    this.router.navigate(['/admin/member',id], { queryParams: { tab: 'add', edit: 'true'} });
  }
}