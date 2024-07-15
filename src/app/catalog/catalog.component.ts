import { Component, inject } from '@angular/core';
import { IProduct } from './product.model'
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products: IProduct[] = [];
  filter: string = '';

  // Adding a service here is more readable but limited with unit tests.
  // Pass through constructor for unit tests easability.
  private cartSvc: CartService = inject(CartService);

  constructor(
    private productSvc: ProductService,
    private router: Router, // Inject the router to programmatically redirect a user
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Need to call the subscribe method on the Observable to ensure it makes a call to the API
    this.productSvc.getProducts().subscribe(productData => {
      this.products = productData;
    });

    /* snapshot get's the active route & we get the param defined in our router which we called 'filter'.
       snapshot is set when the component is first loaded.
       It works fine when linking from one component to the another component.
       However, when linking or routing the component back to itself is when it causes issues by becoming stale.

       eg: this.filter = this.route.snapshot.params['filter'];
    */

    /**
     * Subscribing to the params or queryParams observable will update the state on the current component.
    */

    this.route.queryParams.subscribe((queryParams) => {
      // we wouldn't need the ?? operator if using route 'params' because the value is defined by the dynamic link.
      // Since using 'queryParams' the default value isn't defined so we need to explicitly set it here in the component.
      console.log("queryParams: ", queryParams);
      this.filter = queryParams['filter'] ?? '';
    })
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
    this.router.navigate(['/cart'])
  }

  getFilteredProducts() {
    return this.filter === '' ? this.products : this.products.filter(product => product.category.toLowerCase() === this.filter);
  }


}
