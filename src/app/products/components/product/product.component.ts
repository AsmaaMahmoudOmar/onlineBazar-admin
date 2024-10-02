import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Products } from '../../interface/products';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  constructor
    (
      private prodService: ProductService,
      private _TosterService: ToastrService,
      private render: Renderer2
    ) { }
  //Product
  products: Products[] = [];
  categories: string[] = [];
  cartProducts: any[] = []
  baseUrl: any = '';
  @ViewChild('model') modelElement!: ElementRef

  ngOnInit(): void {
    this.getProducts()
    this.getCategory()
  }
  formProduct: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required])
  })
  showAddProduct() {
    this.render.removeClass(this.modelElement.nativeElement, 'd-none')
    this.render.addClass(this.modelElement.nativeElement, 'd-flex')
  }
  closeElement() {
    this.render.addClass(this.modelElement.nativeElement, 'd-none')
    this.render.removeClass(this.modelElement.nativeElement, 'd-flex')


  }
  getProducts() {
    this.prodService.getAllProduct().subscribe({
      next: (res) => {
        console.log(res);
        this.products = res
      },
      error: (err) => {
        console.log(err);
        this._TosterService.error(err?.message);
      }
    })
  }
  getCategory() {
    this.prodService.getAllCategory().subscribe({
      next: (res) => {
        this.categories = res
      },
      error: (error) => {
        this._TosterService.error(error?.message);

      }
    })
  }
  getImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.baseUrl = reader.result
      this.formProduct.get('image')?.setValue("eny string ")// any string because baseUrl too long
    }
  }
  addProd() {
    let model = this.formProduct.value
    console.log(model);

    this.prodService.creatProduct(model).subscribe({
      next: (res) => {
        console.log(res);
        this._TosterService.success('Product added');
        this.formProduct.setValue({
          title: "",
          price: "",
          description: "",
          image: "",
          category: ""
        })
        this.baseUrl = ""
      },
      error: (err) => {
        this._TosterService.error(err)

      }
    })
  }
  getTypeCategory(event: any) {
    console.log(event.target.value);

    this.formProduct.get('category')?.setValue(event.target.value)
    console.log(this.formProduct);

  }

}
