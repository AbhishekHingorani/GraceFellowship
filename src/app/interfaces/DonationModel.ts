export interface DonationModel {
    report:              any;
    cheque:              Cheque[];
    general:             General[];
    tithe:               Tithe[];
    donation_category:   string[];
}

export interface Cheque {
    amount:      number;
    bank:        string;
    cheque_date: string;
    cheque_no:   string;
    name:        string;
}

export interface General {
    denom:    string;
    quantity: number;
}

export interface Tithe {
    amount: number;
    name:   string;
}
