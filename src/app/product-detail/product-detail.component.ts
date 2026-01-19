import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../shared/types/product';
import { ProductService } from '../../services/ProductService';
import { CurrencyPipe } from '../shared/pipes/CurrencyPipe.pipe';
import { DateFormatPipe } from '../shared/pipes/DateFormatPipe.pipe';

@Component({
  selector: 'product-detail',
  imports: [CurrencyPipe, DateFormatPipe],
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  id = '';
  product: IProduct | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit() {
    if (this.id) {
      this.handleGetProductDetail(this.id);
    }
  }

  handleGetProductDetail = (id: string) => {
    this.productService.getDetailProduct(id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  };

  goBack() {
    this.router.navigate(['/']);
  }
}
