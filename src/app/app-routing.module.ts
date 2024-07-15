import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  /* keeping pathMatch at 'full' vs. 'prefix' ignores route order in array
    Use 'full' when creating route redirects.
  */
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, title: "Home - Joes's Robot Shop"},
  { path: 'catalog', component: CatalogComponent, title: "Catalog - Joes's Robot Shop"},
  { path: 'cart', component: CartComponent, title: "Cart - Joes's Robot Shop"},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
