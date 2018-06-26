import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BackEndCalls
{
  constructor(private http: HttpClient) {}

  private URL = "https://grace-fellowship.herokuapp.com";
  //private URL = "http://5b18c6fd3f38e20014a22f3f.mockapi.io";

   
  getURL(){
    return this.URL;
  }

  //=====================================================================//
  //---------------------------- ADMIN ---------------------------------//
  //===================================================================//

  getAllVolunteers(){
    return this.http.get(this.URL + '/admin/volunteers')
  }
  
  getVolunteer(volunteerId){
    return this.http.get(this.URL + '/admin/volunteer/' + volunteerId)
  }
  
  deleteVolunteer(volunteerId){
    return this.http.delete(this.URL + '/admin/volunteer/' + volunteerId)
  }

  addVolunteer(data){
    return this.http.post(this.URL + '/admin/volunteer', data)
  }

  editVolunteer(id, data){
    return this.http.patch(this.URL + "/admin/volunteer/" + id, data)
  }

  /*--------------*/

  getAllCampuses(){
    return this.http.get(this.URL + '/admin/campuses')
  }

  changeCampusPassword(campusId, data){
    return this.http.post(this.URL + "/admin/campus/" + campusId + "/password", data)
  }

  insertCampus(data){
    return this.http.post(this.URL + '/admin/campus', data)
  }

  /*--------------*/

  getBatchMembersOfCampus(campusId){
    return this.http.get(this.URL + '/admin/campus/' + campusId + '/batch_members');
  }

  getMember(campusId, memberId){
    return this.http.get(this.URL + '/admin/campus/' + campusId + '/batch_member/' + memberId)
  }

  deleteMember(campusId, memberId){
    return this.http.delete(this.URL + '/admin/campus/' + campusId + '/batch_member/' + memberId)
  }

  editMember(campusId, data){
    return this.http.patch(this.URL + '/admin/campus/' + campusId + '/batch_member/' + data.id, data)
  }

  addMember(campusId, data){
    return this.http.post(this.URL + '/admin/campus/' + campusId + '/batch_member', data);
  }

  /*--------------*/

  getAllInstrumentOfCampus(campusId){
    return this.http.get(this.URL + '/admin/campus/' + campusId + '/instruments');
  }

  deleteInstrument(campusId, instrumentId){
    return this.http.delete(this.URL + '/admin/campus/' + campusId + '/instrument/' + instrumentId)
  }

  addInstrument(campusId, data){
    return this.http.post(this.URL + '/admin/campus/' + campusId + '/instrument', data);
  }

  editInstrument(campusId, insId, data){
    return this.http.patch(this.URL + '/admin/campus/' + campusId + '/instrument/' + insId, data);
  }

  /*--------------*/

  getAllTrustees(){
    return this.http.get(this.URL + '/admin/trustee');
  }

  deleteTrustee(trusteeId){
    return this.http.delete(this.URL + '/admin/trustee/' + trusteeId)
  }

  addTrustee(data){
    return this.http.post(this.URL + '/admin/trustee', data);
  }

  /*--------------*/

  getAllDonationCategories(campusId){
    return this.http.get(this.URL + '/admin/campus/' + campusId + '/donation_category');
  }

  deleteDonationCategory(campusId, donationCatId){
    return this.http.delete(this.URL + '/admin/campus/' + campusId + '/donation_category/' + donationCatId)
  }

  addDonationCategory(campusId, data){
    return this.http.post(this.URL + '/admin/campus/' + campusId + '/donation_category', data);
  }

  editDonationCategory(campusId, donationCatId, data){
    return this.http.patch(this.URL + '/admin/campus/' + campusId + '/donation_category/' + donationCatId, data);
  }

  //=====================================================================//
  //-------------------------- Volunteer -------------------------------//
  //===================================================================//

  getAllReports(campusId){
    return this.http.get(this.URL + '/campus/' + campusId + '/report');
  }

  getSingleReport(campusId, reportId){
    return this.http.get(this.URL + '/campus/' + campusId + '/report/' + reportId);
  }

  addNewReport(campusId, data){
    return this.http.post(this.URL + '/campus/' + campusId + '/report/basic', data);
  }

  deleteReport(campusId, reportId){
    return this.http.delete(this.URL + '/campus/' + campusId + '/report/' + reportId)
  }

  editBasicReportDetails(campusId, reportId, data){
    return this.http.patch(this.URL + '/campus/' + campusId + '/report/' + reportId, data);
  }
}
