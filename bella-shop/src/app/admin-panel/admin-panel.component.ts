import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {CATEGORIES} from '../mocks/shop';
import {IProduct} from '../models';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  categoryList = [];
  categories = new FormControl();
  searchValue = '';
  initProducts: IProduct[] = JSON.parse(localStorage.getItem('products')) || [];
  products: IProduct[] = JSON.parse(localStorage.getItem('products')) || [];

  constructor() { }

  ngOnInit(): void {
    this.categoryList = CATEGORIES;
  }

  onDeleteProduct = (id: number) => {
    this.products = this.products.filter(e => e.id !== id);
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  onChange (event: any) {
    const value = event.target.value;
    if (value) {
      this.products = this.initProducts.filter(e => e.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    } else {
      this.products = this.initProducts;
    }
  }

  prepareBooleans = (master, keys) => {
    let cnt = 0;
    const booleans = master.map(el => {
      cnt += !keys.includes(el) ? 1 : 0;
    });
    return cnt === 0;
  }

  onChooseCategory = () => {
    if (this.categories.value.length) {
      this.products = this.initProducts.filter(e => this.prepareBooleans(e.categoryIds, this.categories.value));
    } else {
      this.products = this.initProducts;
    }
  }

}
