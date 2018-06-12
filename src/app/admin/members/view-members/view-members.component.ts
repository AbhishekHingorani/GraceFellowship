import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { MemberModel } from "../../../interfaces/MemberModel";
import { BackEndCalls } from "../../../services/BackendHandling/backend-calls.service";
import { Subject } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'view-members',
  templateUrl: './view-members.component.html',
  styleUrls: ['./view-members.component.scss']
})
export class ViewMembersComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  members: MemberModel[] = [];
  m: MemberModel[] = [
    {
      id: '1',
      name: 'aa',
      gender: 'm',
      email: 'aaa',
      contact: '55',
      address: 'aa'
    },
    {
      id: '2',
      name: 'bb',
      gender: 'f',
      email: 'aaa',
      contact: '55',
      address: 'aa'
    },
    {
      id: '3',
      name: 'cc',
      gender: 'm',
      email: 'aaa',
      contact: '55',
      address: 'aa'
    }
  ];

  dtOptions: any = {};
  dtTrigger: Subject<MemberModel> = new Subject();  
  campusList = [];
  settings = {};
  isLoading: boolean = true;
  
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


      this.members = this.m;
      this.dtTrigger.next();
    })

    
  }
    
  onItemSelect(item:any){
    this.service.getBatchMembersOfCampus(item.id)
    .subscribe((data: MemberModel[]) => {
      if(data) console.log(data);
      //console.log(data);
      //this.members = data;
      //  this.dtTrigger.next();
    });
  }

  deleteMember(id: string){
    //searching id from array and deleting it
    let index = this.members.map(function(x){ return x.id; }).indexOf(id);
    this.members.splice(index,1);

    this.rerenderTable();
    
    //Sending delete request to server
    this.service.deleteMember(id)
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
