import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'members-manager',
  templateUrl: './members-manager.component.html',
  styleUrls: ['./members-manager.component.scss']
})
export class MembersManagerComponent implements OnInit {

  @ViewChild('tabs') ngbTabSet;
  constructor(
    public router: Router, 
    public activatedRoute: ActivatedRoute, 
    public cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit(){
    let tab;

    this.activatedRoute.queryParamMap
      .subscribe(params => {
        tab = params.get('tab');
        this.ngbTabSet.select(tab);
        this.cd.detectChanges();
      });
  }

  tabChange(e){
    this.router.navigate(
      ['.'], 
      { relativeTo: this.activatedRoute, queryParams: {tab: e} }
    );
  }
}
