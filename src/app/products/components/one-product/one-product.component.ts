import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.scss']
})
export class OneProductComponent {
@Input() data :any ={};
@Input() products:any[] =[];
@Input() title:string=''
@Input() category:string=''
@Input() price:string=''
@Input() NameBtn :string =''

@Output() Clicked= new EventEmitter<void>()

clickAddProduct(){
this.Clicked.emit()
}
}
