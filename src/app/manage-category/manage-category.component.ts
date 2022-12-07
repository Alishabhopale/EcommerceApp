import { Component } from '@angular/core';
import { FormBuilder,FormControl } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent {
categoryData! : any;
 // formValue !: FormGroup;


  constructor(private api:ApiService,
   private formbuilder: FormBuilder){}

  formValue = this.formbuilder.group({
    categoryName : [''],
  })
  ngOnInit() :void{
    this.getCategoryDetails();
  }

  postCategoryDetails(){
    this.api.postCategory(this.formValue.value)
    .subscribe(res=>{
      console.log(res);
      alert("Category Added");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getCategoryDetails();
      },
      err=>{
        alert("Something went wrong");
      })

  }
  getCategoryDetails(){
    this.api.getCategory()
    .subscribe(res=>{
      this.categoryData = res;
    })
  }
  deleteCategoryDetails(category:any){
    this.api.deleteCategory(category.id)
    .subscribe(res=>{
      alert("Category deleted");
      this.getCategoryDetails();
    })
  }
  onEdit(category:any){
    this.formValue.patchValue({
      categoryName : category?.categoryName
    })
    console.log(category);
    this.categoryData.id = category.id;
  }
  updateCategoryDetails(){
    let postData = this.formValue.getRawValue();
    this.api.updateCategory(postData,this.categoryData.id)
    .subscribe(res=>{
      alert("updated successfully");

      let ref = document.getElementById('cancel')
      ref?.click();

      this.getCategoryDetails();
    })
  }
  
}
