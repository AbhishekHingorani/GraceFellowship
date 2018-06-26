import { Injectable } from '@angular/core';
import { ReportModel } from '../../interfaces/ReportModel';
import { VolunteerModel } from '../../interfaces/VolunteerModel';
import { MemberModel } from '../../interfaces/MemberModel';

@Injectable()
export class DataStorage {

    public campusList: any[];
    public member: MemberModel;
    public volunteer: VolunteerModel;

    public allReports: any[];
    public selectedReport: ReportModel;

    public constructor() { }
}