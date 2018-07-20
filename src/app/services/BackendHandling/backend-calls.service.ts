import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BackEndCalls
{
  constructor(public http: HttpClient) {}

  private URL = "http://mis.graceahmedabad.com:9797";
  //private URL = "https://grace-fellowship.herokuapp.com";
  //private URL = "http://5b18c6fd3f38e20014a22f3f.mockapi.io";

   
  getURL(){
    return this.URL;
  }

  //=====================================================================//
  //---------------------------- ADMIN ---------------------------------//
  //===================================================================//

  getAllVolunteers(campusId){
    return this.http.get(this.URL + '/admin/campus/'+ campusId +'/volunteers')
  }
  
  getVolunteer(campusId, volunteerId){
    return this.http.get(this.URL + '/admin/campus/' + campusId + '/volunteer/' + volunteerId)
  }
  
  deleteVolunteer(campusId, volunteerId){
    return this.http.delete(this.URL + '/admin/campus/' + campusId + '/volunteer/' + volunteerId)
  }

  addVolunteer(campusId, data){
    return this.http.post(this.URL + '/admin/campus/' + campusId + '/volunteer', data)
  }

  editVolunteer(campusId, id, data){
    return this.http.patch(this.URL + '/admin/campus/' + campusId + '/volunteer/' + id, data)
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
    return this.http.get(this.URL + '/admin/trustees');
  }

  deleteTrustee(trusteeId){
    return this.http.delete(this.URL + '/admin/trustee/' + trusteeId)
  }

  addTrustee(data){
    return this.http.post(this.URL + '/admin/trustee', data);
  }

  changeTrusteePassword(trusteeId, data){
    return this.http.patch(this.URL + '/admin/trustee/' + trusteeId, data);
  }

  /*--------------*/

  getAllDonationCategories(){
    return this.http.get(this.URL + '/admin/donation_category');
  }

  deleteDonationCategory(donationCatId){
    return this.http.delete(this.URL + '/admin/donation_category/' + donationCatId)
  }

  addDonationCategory(data){
    return this.http.post(this.URL + '/admin/donation_category', data);
  }

  editDonationCategory(donationCatId, data){
    return this.http.patch(this.URL + '/admin/donation_category/' + donationCatId, data);
  }

  //=====================================================================//
  //---------------------------- Campus --------------------------------//
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
    return this.http.patch(this.URL + '/campus/' + campusId + '/report/' + reportId + "/basic", data);
  }

  /* ------------------ */

  markAttendance(campusId, reportId, data){
    return this.http.patch(this.URL + '/campus/' + campusId + '/report/' + reportId + '/attendance_attendees', data);
  }

  /* ------------------ */

  editWorshipDetails(campusId, reportId, data){
    return this.http.patch(this.URL + '/campus/' + campusId + '/report/' + reportId + "/worship", data);
  }

  /* ------------------ */

  editSermonDetails(campusId, reportId, data){
    return this.http.patch(this.URL + '/campus/' + campusId + '/report/' + reportId + "/sermon", data);
  }

  /* ------------------ */

  editEndingDetails(campusId, reportId, data){
    return this.http.patch(this.URL + '/campus/' + campusId + '/report/' + reportId + "/activities_ending", data);
  }

  /* ------------------ */

  getBatchMembersOfCampus_Campus(campusId){
    return this.http.get(this.URL + '/campus/' + campusId + '/batch_members');
  }

  getMember_Campus(campusId, memberId){
    return this.http.get(this.URL + '/campus/' + campusId + '/batch_member/' + memberId)
  }

  deleteMember_Campus(campusId, memberId){
    return this.http.delete(this.URL + '/campus/' + campusId + '/batch_member/' + memberId)
  }

  editMember_Campus(campusId, data){
    return this.http.patch(this.URL + '/campus/' + campusId + '/batch_member/' + data.id, data)
  }

  addMember_Campus(campusId, data){
    return this.http.post(this.URL + '/campus/' + campusId + '/batch_member', data);
  }

  //=====================================================================//
  //--------------------------- Volunteer-------------------------------//
  //===================================================================//

  getAllReports_Volunteer(volunteerId){
    return this.http.get(this.URL + '/volunteer/' + volunteerId + '/reports');
  }

  getSingleDonationReport(volunteerId, reportId){
    return this.http.get(this.URL + '/volunteer/' + volunteerId + '/report/' + reportId + "/offerings");
  }

  submitGeneralDonation(volunteerId, reportId, data){
    return this.http.post(this.URL + '/volunteer/' + volunteerId + '/report/' + reportId + "/offerings/general", data);
  }

  submitTitheDonation(volunteerId, reportId, data){
    return this.http.post(this.URL + '/volunteer/' + volunteerId + '/report/' + reportId + "/offerings/tithe", data);
  }

  submitChequeDonation(volunteerId, reportId, data){
    return this.http.post(this.URL + '/volunteer/' + volunteerId + '/report/' + reportId + "/offerings/cheque", data);
  }

  
  //=====================================================================//
  //--------------------------- Trustee --------------------------------//
  //===================================================================//

  getAllTrusteeSummaryReports(trusteeId, month, year){
    return this.http.get(this.URL + '/trustee/' + trusteeId + '/summary/' + month + '/' + year);
  }

}
