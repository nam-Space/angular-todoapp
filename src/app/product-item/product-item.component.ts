import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IProduct, IProductForm } from '../shared/types/product';
import { ProductService } from '../../services/ProductService';
import { CurrencyPipe } from '../shared/pipes/CurrencyPipe.pipe';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgClass } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { Router } from '@angular/router';
import { DateFormatPipe } from '../shared/pipes/DateFormatPipe.pipe';

@Component({
  selector: 'product-item',
  imports: [
    NzTableModule,
    CurrencyPipe,
    DateFormatPipe,
    NzIconModule,
    NgClass,
    NzModalModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzPageHeaderModule,
    NzSpaceModule,
  ],
  standalone: true,
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  @Input() products: IProduct[] = [];
  @Input() isLoading = false;
  @Output() deleteEvent = new EventEmitter();
  @Output() getAllProductsEvent = new EventEmitter();
  isShowModal = false;
  productData: IProductForm = {
    createdAt: '',
    name: '',
    image: '',
    description: '',
    price: '',
    id: '',
    action: 'ADD',
  };

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getAllProductsEvent.emit();
  }

  handleNavigate(id: string | undefined): void {
    this.router.navigate(['/detail', id]);
  }

  showModal(e: Event, data: IProduct | null, action: string): void {
    e.stopPropagation();
    this.isShowModal = true;
    if (action === 'EDIT') {
      this.productData = {
        createdAt: (data as any).createdAt,
        name: (data as IProduct).name,
        image: (data as IProduct).image,
        description: (data as IProduct).description,
        price: (data as IProduct).price,
        id: (data as IProduct).id,
        action,
      };
    } else {
      this.productData = {
        createdAt: '',
        name: '',
        image: '',
        description: '',
        price: '',
        id: '',
        action: 'ADD',
      };
    }
  }

  handleAdd = (data: IProduct) => {
    this.productService.addProduct(data).subscribe({
      next: (data) => {
        this.handleCloseModal();
        this.getAllProductsEvent.emit();
      },
      error: (err) => {
        console.error(err);
      },
    });
  };

  handleUpdate = (id: string, data: IProduct) => {
    this.productService.updateProduct(id, data).subscribe({
      next: (data) => {
        this.handleCloseModal();
        this.getAllProductsEvent.emit();
      },
      error: (err) => {
        console.error(err);
      },
    });
  };

  handleDelete = (e: Event, id: string) => {
    e.stopPropagation();
    this.deleteEvent.emit(id);
  };

  handleSubmit(): void {
    if (this.productData.action === 'ADD') {
      const productBody: IProduct = {
        name: this.productData.name,
        description: this.productData.description,
        price: this.productData.price,
      };
      this.handleAdd(productBody);
    } else {
      const productBody: IProduct = {
        createdAt: this.productData.createdAt,
        name: this.productData.name,
        image: this.productData.image,
        description: this.productData.description,
        price: this.productData.price,
      };
      this.handleUpdate(this.productData.id as string, productBody);
    }
  }

  handleCloseModal(): void {
    this.productData = {
      createdAt: '',
      name: '',
      image: '',
      description: '',
      price: '',
      id: '',
      action: 'ADD',
    };
    this.isShowModal = false;
  }
}
