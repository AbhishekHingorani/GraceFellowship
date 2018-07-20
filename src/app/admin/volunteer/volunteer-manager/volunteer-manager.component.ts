import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'volunteer-manager',
  templateUrl: './volunteer-manager.component.html',
  styleUrls: ['./volunteer-manager.component.scss']
})
export class VolunteerManagerComponent implements OnInit {

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
