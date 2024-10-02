import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private HttpClient:HttpClient) { }
  getAllProduct():Observable<any>{
   return this.HttpClient.get(Environment.baseUrl+'products')
  }
  getAllCategory():Observable<any>{
    return this.HttpClient.get(Environment.baseUrl+'products/categories')
  }
  getSingleProduct(id:number):Observable<any>{
    return this.HttpClient.get(Environment.baseUrl+`products/${id}`)
  }
creatProduct(data:any):Observable<any>{
    return this.HttpClient.post(Environment.baseUrl+'products',{data})
  }
}
