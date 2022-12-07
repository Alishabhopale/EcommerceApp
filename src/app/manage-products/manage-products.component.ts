import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProdapiService } from '../service/prodapi.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent {

  productData! : any;
  categories : any =[{value:'Mobile'},{value:'Home'}];
  isValidated : boolean = false;
 // formValue !: FormGroup;


  constructor(private prodapi:ProdapiService,
   private formbuilder: FormBuilder){}

  formValue = this.formbuilder.group({
    productName : [''],
    price : [''],
    description : [''],
    categories : ['']
  })
  ngOnInit() :void{
    this.getProductDetails();
  }

  postProductDetails(){
    this.prodapi.postProduct(this.formValue.value)
    .subscribe(res=>{
      console.log(res);
      alert("Product Added");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getProductDetails();
      },
      err=>{
        alert("Something went wrong");
      })

  }
  getProductDetails(){
    this.prodapi.getProduct()
    .subscribe(res=>{
      this.productData = res;
     // this.formValue.patchValue(this.productData);
    })
  }
  deleteProductDetails(product:any){
    this.prodapi.deleteProduct(product.id)
    .subscribe(res=>{
      alert("Product deleted");
      this.getProductDetails();
    })
  }
  onEdit(product:any){
    this.formValue.patchValue({
      productName : product?.productName,
      price : product?.price,
      description : product?.description,
      categories : product?.categories
    })
    console.log(product);
    this.productData.id = product.id;
  }
  updateProductDetails(){
    let postData = this.formValue.getRawValue();
    let data = this.productData
    this.prodapi.updateProduct(postData,data.id)
    .subscribe(res=>{
      alert("updated successfully");

      let ref = document.getElementById('cancel')
      ref?.click();

      this.getProductDetails();
    })
  
}
}
