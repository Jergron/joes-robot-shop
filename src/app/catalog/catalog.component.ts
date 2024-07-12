import { Component, inject } from '@angular/core';
import { IProduct } from './product.model'
import { CartService } from '../cart.service';
import { ProductService } from './product.service';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products!: IProduct[];
  filter: string = '';

  // Adding a service here is more readable but limited with unit tests.
  // Pass through constructor for unit tests easability.
  private cartSvc: CartService = inject(CartService);

  constructor(private productSvc: ProductService) {

  }

  ngOnInit() {
    // Need to call the subscribe method on the Observable to ensure it makes a call to the API
    this.productSvc.getProducts().subscribe(productData => {
      this.products = productData;
    })
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
  }

  getFilteredProducts() {
    return this.filter === '' ? this.products : this.products.filter(product => product.category === this.filter);
  }


}
