import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataStorage } from '../../../services/Providers/DataStorage';
import { BackEndCalls } from '../../../services/BackendHandling/backend-calls.service';
import { Subject } from 'rxjs';
import { MemberModel } from '../../../interfaces/MemberModel';
import swal from 'sweetalert2';
import { AuthService } from '../../../services/AuthGuards/auth.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'view-campus-members',
  templateUrl: './view-campus-members.component.html',
  styleUrls: ['./view-campus-members.component.scss']
})
export class ViewCampusMembersComponent implements OnInit {

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  dtOptions: any = {
    responsive: true,
    pagingType: 'full_numbers',
    pageLength: 10
  };
  dtTrigger: Subject<MemberModel> = new Subject();
  isLoading: boolean = true;
  isTableLoadingForTheFirstTime: boolean = true;
  
  constructor(
    public router: Router, 
    public authService: AuthService,
    public activatedRoute: ActivatedRoute, 
    public storage: DataStorage,
    public service: BackEndCalls
  ) { }

  ngOnInit() {
    if(!this.storage.membersList){
      this.fetchBatchMembers(this.authService.currentUser.id);
    }
    else{
      setTimeout(() => {
        this.dtTrigger.next();
      });
      this.isLoading = false;  
    }
  }

  fetchBatchMembers(id){
    this.service.getBatchMembersOfCampus_Campus(id)
    .subscribe((data: MemberModel[]) => {
      this.storage.membersList = data;      
      this.dtTrigger.next();
      
      this.isLoading = false;
    },
    error => {
      this.isLoading = false;
      swal('Error', 'Some error occured fetching the data..', 'error');
    });
  }

  deleteMember(id: string){
    //searching id from array and deleting it
    let index = this.storage.membersList.map(function(x){ return x.id; }).indexOf(id);
    let tempMember = this.storage.membersList[index];
    this.storage.membersList.splice(index,1);

    this.rerenderTable();
    
    //Sending delete request to server
    this.service.deleteMember_Campus(this.authService.currentUser.id, id)
    .subscribe(data => {
    },error => {
      this.storage.membersList.push(tempMember);
      swal('Error','There was an error deleting the member','error');
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
    this.router.navigate(['/campus/campus-members-manager',member.id], {queryParams: { tab: 'add', edit: 'true' } });
  }

}
