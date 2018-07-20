import { Injectable } from '@angular/core';
import { ReportModel } from '../../interfaces/ReportModel';
import { VolunteerModel } from '../../interfaces/VolunteerModel';
import { MemberModel } from '../../interfaces/MemberModel';
import { DonationModel } from '../../interfaces/DonationModel';
import { TrusteeReportModel } from '../../interfaces/TrusteeReportModel';

@Injectable()
export class DataStorage {

    public campusList: any[];
    public member: MemberModel;
    public volunteer: VolunteerModel;

    public allReports: any[];
    public selectedReport: ReportModel;
    public selectedReportId: string;
    public newMembers: string[];
    public othersCount: number = 0;

    public membersList: MemberModel[];
    public donation: DonationModel;
    
    public constructor() { }
}