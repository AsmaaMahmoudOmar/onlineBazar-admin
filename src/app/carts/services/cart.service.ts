import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  getCarts():Observable<any>{
    return this._HttpClient.get(Environment.baseUrl+'carts')
  }
  getCartByDate(param:any){
    let params = new HttpParams();
    params.append("startdate",param?.start).append('enddate',param?.end)
    
    return this._HttpClient.get(Environment.baseUrl+'carts',{params})

  }
  detetCart(id:number):Observable<any>{
    return this._HttpClient.get(Environment.baseUrl+`carts/${id}`)
  }
}
