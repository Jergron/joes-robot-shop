import { Injectable } from '@angular/core';
import { IProduct } from './catalog/product.model';

@Injectable({
  providedIn: 'root'
})

/**
 * Display logic should live in your component.
 * Business logic should live in your services.
 */
export class CartService {
  cart: IProduct[] = [];

  constructor() { }

  add(product: IProduct) {
    this.cart.push(product);
    console.log(`product ${product.name} added to cart`);
  }
}
