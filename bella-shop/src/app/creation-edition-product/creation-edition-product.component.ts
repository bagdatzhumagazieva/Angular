import { EventEmitter } from '@angular/core';
import {Input, Output} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {AGE_RANGE, CATEGORIES} from '../mocks/shop';
import {IProduct} from '../models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-creation-edition-product',
  templateUrl: './creation-edition-product.component.html',
  styleUrls: ['./creation-edition-product.component.scss']
})
export class CreationEditionProductComponent implements OnInit {

  @Input() type: 'create' | 'edit';
  @Input() productId?: number;
  // @Output() removeToast: EventEmitter<number> = new EventEmitter<number>();
  categoryList = [];
  categories = new FormControl();
  age = new FormControl();
  ageRange = [];
  product: IProduct = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    categoryIds: [],
    ageRangeId: 0,
  };
  products: IProduct[] = JSON.parse(localStorage.getItem('products')) || [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.type === 'edit') {
      this.product = this.products.find(e => e.id === this.productId);
    }
    this.categoryList = CATEGORIES;
    this.ageRange = AGE_RANGE;
  }

  onCreateProduct = () => {
    const newProduct: IProduct = {
      id: (this.products.length ? this.products[this.products.length - 1]?.id : -1) + 1,
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      categoryIds: this.categories.value,
      ageRangeId: this.age.value,
    };
    if (this.type === 'create') {
      this.products = [...this.products, newProduct];
      localStorage.setItem('products', JSON.stringify(this.products));
    } else {
      this.products = this.products.filter(e => e.id === this.productId ? newProduct : e);
      localStorage.setItem('products', JSON.stringify(this.products));
    }
    this.router.navigateByUrl('/admin-panel');
  }
}
