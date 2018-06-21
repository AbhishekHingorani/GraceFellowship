import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import swal from 'sweetalert2';
import { DataStorage } from '../../services/Providers/DataStorage';

@Component({
  selector: 'instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss']
})
export class InstrumentsComponent implements OnInit {

  submitBtn = "+";
  selectedCampusId: string = "";
  campusList;
  instrumentList;
  isLoading: boolean = true;
  isAddInstrumentLoading = false;
  newInstrumentName: string = "";

  constructor(
    private router: Router, 
    private storage: DataStorage, 
    private service: BackEndCalls
  ) { }

  ngOnInit() {
    if(this.storage.campusList == null){
      this.getCampusList();
    }
    else{
      this.campusList = this.storage.campusList;
      this.isLoading = false;   
    }
  }

  getCampusList(){
    this.service.getAllCampuses()
    .subscribe(data => {
      this.campusList = data;
      this.storage.campusList = this.campusList;
      this.isLoading = false;
    })
  }

  addInstrument(){
    this.toggleLoading();
    if(this.newInstrumentName == ""){
      swal('Error','Name of the instrument is required','error');
      this.toggleLoading();
      return;
    }

    let data = {instrument: this.newInstrumentName}
    
    this.service.addInstrument(this.selectedCampusId, data)
    .subscribe(data => {
      //swal('Success','Instrument added successfully','success');
      swal({
        title: "Instrument added successfully!",
        toast: true,
        position: 'top-end',
        type: 'success',
        timer: 1500
      });

      
      this.instrumentList.push({
        id: data,
        name: this.newInstrumentName
      });

      this.newInstrumentName = "";
      console.log(this.instrumentList);
      
      this.toggleLoading();
    },
    error => {
      swal('Error','Some Error Occured, Cannot add instrument','error');
      this.toggleLoading();
    });
  }

  onCampusChange(id){
    this.selectedCampusId = id;

    this.service.getAllInstrumentOfCampus(id)
    .subscribe(data => {
      this.instrumentList = data;
      this.isLoading = false;
      console.log(this.instrumentList);
    })
  }

  deleteInstrument(id){
    let index = this.instrumentList.map(function(x){ return x.id; }).indexOf(id);
    this.instrumentList.splice(index,1);
    
    let deletedInstrument = this.instrumentList[index];
    
    this.service.deleteInstrument(this.selectedCampusId, id)
    .subscribe(data => {
      if(data < 1 || data == null){
        swal('Error','There was an error deleting the instrument','error');
        this.instrumentList.push(deletedInstrument);
      }
    })
  }

  editInstrument(id, newName){
    if(newName == "") { return; }

    let index = this.instrumentList.map(function(x){ return x.id; }).indexOf(id);
    let oldName = this.instrumentList[index].name;
    this.instrumentList[index].name = newName;

    console.log(oldName + ", " + newName);

    let data = {instrument: newName}

    this.service.editInstrument(this.selectedCampusId, id, data)
    .subscribe(data => {
      console.log("data : ");
      console.log(data);
      if(data<1 || data==null){
        this.instrumentList[index].name = oldName;
      }
    });
  }

  toggleLoading(){
    if(this.isAddInstrumentLoading){
      this.isAddInstrumentLoading = false;
      this.submitBtn = "+";
    }else{
      this.isAddInstrumentLoading = true;
      this.submitBtn = "";
    }
  }

}
