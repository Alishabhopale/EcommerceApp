import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productList : any;

  constructor(private api : ApiService) {} 

  ngOnInit() : void {
    this.api.getCategory()
    .subscribe(res=>{
      this.productList = res;
    })
  }
}
