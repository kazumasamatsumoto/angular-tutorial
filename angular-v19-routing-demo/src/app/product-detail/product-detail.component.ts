import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  @Input() id!: string;
  product?: Product;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    if (this.id) {
      this.productService.getProduct(Number(this.id)).subscribe(product => {
        if (product) {
          this.product = product;
        } else {
          this.router.navigate(['/not-found']);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
