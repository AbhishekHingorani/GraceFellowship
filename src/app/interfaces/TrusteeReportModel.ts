export interface TrusteeReportModel {
    id:      string;      //campusId
    name:    string;      //campusName
    reports: TReport[];   //reports of that campus for particular month
}

export interface TReport {
    begining:      Begining;
    date:          string;
    id:            string;
    language:      string;
    general_total: number;
    tithe_total:   number;
    cheque_total:  number;
    attendance?:   Attendance;
    ending?:       Ending;
    sermon?:       Begining;
}

export interface Attendance {
    female: string;
    male:   string;
    new:    string;
    total:  string;
}

export interface Begining {
    start: string;
}

export interface Ending {
    time: string;
}
