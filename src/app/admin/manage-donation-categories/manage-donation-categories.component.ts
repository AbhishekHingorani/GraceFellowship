import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackEndCalls } from '../../services/BackendHandling/backend-calls.service';
import swal from 'sweetalert2';
import { DataStorage } from '../../services/Providers/DataStorage';

@Component({
  selector: 'manage-donation-categories',
  templateUrl: './manage-donation-categories.component.html',
  styleUrls: ['./manage-donation-categories.component.scss']
})
export class ManageDonationCategoriesComponent implements OnInit {

  submitBtn = "+";
  selectedCampusId: string = "";
  campusList;
  categoryList;
  isLoading: boolean = true;
  isAddCategoryLoading = false;
  newCategoryName: string = "";

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

  addCategory(){
    this.toggleLoading();
    if(this.newCategoryName == ""){
      swal('Error','Name of the category is required','error');
      this.toggleLoading();
      return;
    }

    let data = {category: this.newCategoryName}
    
    this.service.addDonationCategory(this.selectedCampusId, data)
    .subscribe(data => {
      //swal('Success','Category added successfully','success');
      swal({
        title: "Category added successfully!",
        toast: true,
        position: 'top-end',
        type: 'success',
        timer: 1500
      });

      
      this.categoryList.push({
        id: data,
        category: this.newCategoryName
      });

      this.newCategoryName = "";
      console.log(this.categoryList);
      
      this.toggleLoading();
    },
    error => {
      swal('Error','Some Error Occured, Cannot add category','error');
      this.toggleLoading();
    });
  }

  onCampusChange(id){
    this.selectedCampusId = id;

    this.service.getAllDonationCategories(id)
    .subscribe(data => {
      this.categoryList = data;
      this.isLoading = false;
      console.log(this.categoryList);
    })
  }

  deleteCategory(id){
    let index = this.categoryList.map(function(x){ return x.id; }).indexOf(id);
    this.categoryList.splice(index,1);
    
    let deletedCategory = this.categoryList[index];
    
    this.service.deleteDonationCategory(this.selectedCampusId, id)
    .subscribe(data => {
      if(data < 1 || data == null){
        swal('Error','There was an error deleting the category','error');
        this.categoryList.push(deletedCategory);
      }
    })
  }

  editCategory(id, newName){
    if(newName == "") { return; }

    let index = this.categoryList.map(function(x){ return x.id; }).indexOf(id);
    let oldName = this.categoryList[index].category;
    this.categoryList[index].category = newName;

    console.log(oldName + ", " + newName);

    let data = {category: newName}

    this.service.editDonationCategory(this.selectedCampusId, id, data)
    .subscribe(data => {
      console.log("data : ");
      console.log(data);
      if(data<1 || data==null){
        this.categoryList[index].category = oldName;
      }
    });
  }

  toggleLoading(){
    if(this.isAddCategoryLoading){
      this.isAddCategoryLoading = false;
      this.submitBtn = "+";
    }else{
      this.isAddCategoryLoading = true;
      this.submitBtn = "";
    }
  }
}
