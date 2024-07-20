import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit {

  products: product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts: any[] = []
  constructor(private service: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getcategories();
  }
  getProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe((res: any) => {
      this.products = res;
      this.loading = false;
    }, error => {
      this.loading = false;
      alert(error)
    }
    )
  }
  getcategories() {
    this.loading = true;
    this.service.getAllCategories().subscribe((res: any) => {
      // console.log(res);
      this.categories = res;
      this.loading = false;
    }, error => {
      // console.log(error.message);
      this.loading = false;
      alert(error)
    }
    )
  }
  filterCategory(event: any) {
    let value = event.target.value;
    (value == "all") ? this.getProducts() : this.getProductsCategory(value)
  }
  getProductsCategory(keyword: string) {
    this.loading = true;
    this.service.getProductsByCategory(keyword).subscribe((res: any) => {
      // console.log(res);
      this.loading = false;
      this.products = res;
    })
  }
  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartProducts.find(item => item.item.id == event.item.id)
      if (exist) {
        alert("the item already in your cart ")
      } else {
        this.cartProducts.push(event)
        localStorage.setItem("cart", JSON.stringify(this.cartProducts))
      }
    } else {
      this.cartProducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    }

  }
}

