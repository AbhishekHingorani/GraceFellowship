import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { VolunteerModel } from "../../interfaces/VolunteerModel";

@Injectable({
  providedIn: 'root'
})
export class BackEndCalls
{
  constructor(private http: HttpClient) {}

  private URL = "https://grace-fellowship.herokuapp.com";
  //private URL = "http://5b18c6fd3f38e20014a22f3f.mockapi.io";

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

  /*--------------*/

  getURL(){
    return this.URL;
  }
}
