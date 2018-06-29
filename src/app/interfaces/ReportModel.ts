import { MemberModel } from "./MemberModel";

export interface ReportModel {
    report:        Report;
    batch_members: MemberModel[];
    instruments:   InstrumentElement[];
}

export interface InstrumentElement {
    id:   string;
    name: string;
}

export interface Report {
    activities: Activities;
    attendance: Attendance;
    attendees:  Attendees;
    begining:   Begining;
    date:       string;
    dateModel:  DateModel;
    ending:     Ending;
    filedby:    string;
    id:         string;
    language:   string;
    sermon:     Sermon;
    worship:    Worship;
}

export interface DateModel{
    year: number;
    month: number;
    day: number;
}

export interface Activities {
    announcement: string;
    lords_table:  boolean;
}

export interface Attendance {
    female: string;
    male:   string;
    new:    string;
    total:  string;
}

export interface Attendees {
    members: string[];
    new:     string[];
}

export interface Begining {
    prayer: string;
    start:  string;
}

export interface Ending {
    prayer: string;
    time:   string;
}

export interface Sermon {
    end:      string;
    preacher: string;
    start:    string;
    title:    string;
}

export interface Worship {
    choir_members: string[];
    incharge:      Incharge;
    instrument:    any;
    leader:        string;
}

export interface Incharge {
    computer: string;
    sound:    string;
}
