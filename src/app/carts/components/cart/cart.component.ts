import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/products/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private cartSerivce: CartService,
    private _TosterService: ToastrService,
    private _productService: ProductService,
    private _render: Renderer2
  ) { }
  carts: any[] = [];
  cartProducts: any[] = []
  detials: any;
  total: number = 0
  @ViewChild('model') modelElement!: ElementRef

  formDate: FormGroup = new FormGroup({
    start: new FormControl(''),
    end: new FormControl('')
  })
  ngOnInit(): void {
    this.getAllCarts()
  }

  getAllCarts() {
    this.cartSerivce.getCarts().subscribe({
      next: (res) => {
        console.log(res);
        this.carts = res

      }
    })

  }
  filterByDate() {
    let dates = this.formDate.value;
    this.cartSerivce.getCartByDate(dates).subscribe({
      next: (res: any) => {
        console.log(res);
        this.carts = res

      }
    })
  }
  deletCart(id: number) {
    this.cartSerivce.detetCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._TosterService.success('Product Is Deleted')
        this.getAllCarts()

      },
      error:(err)=>{
        this._TosterService.error(err?.message,'Major Error')

      }
    })
  }

  viewDetails(index: any) {
    this.cartProducts = []
    this.detials = this.carts[index]
    for (let x in this.detials.products) {

      this._productService.getSingleProduct(this.detials.products[x].productId).subscribe({
        next: (res) => {
          this.cartProducts.push({ item: res, quantity: this.detials.products[x].quantity })
          this._render.removeClass(this.modelElement.nativeElement, 'd-none');
          this._render.addClass(this.modelElement.nativeElement, 'd-flex')
          console.log(this.cartProducts);
          this.totalPirce()

        }
      })

    }
    console.log(this.detials);

  }
  totalPirce() {
    this.total = 0
    for (let i in this.cartProducts) {
      this.total += this.cartProducts[i].quantity * this.cartProducts[i].item.price
    }
  }
  closeElement() {
    this._render.addClass(this.modelElement.nativeElement, 'd-none')
    this._render.removeClass(this.modelElement.nativeElement, 'd-flex')


  }
}
