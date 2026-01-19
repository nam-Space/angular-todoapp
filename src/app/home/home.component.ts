import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductItemComponent } from '../product-item/product-item.component';
import { IProduct } from '../shared/types/product';
import { finalize } from 'rxjs';
import { ProductService } from '../../services/ProductService';

@Component({
  selector: 'home',
  standalone: true,
  imports: [RouterOutlet, ProductItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: IProduct[] = [];
  product: IProduct | null = null;
  isLoading = false;

  constructor(private productService: ProductService) {}

  handleGetProducts() {
    this.isLoading = true;
    this.productService
      .getAllProducts()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  handleDelete = (id: string) => {
    this.productService.deleteProduct(id).subscribe({
      next: (data) => {
        console.error(data);
        this.handleGetProducts();
      },
      error: (err) => {
        console.error(err);
      },
    });
  };
}
