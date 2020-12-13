import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {AGE_RANGE, CATEGORIES} from '../mocks/shop';
import {IProduct} from '../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  categoryList = [];
  ageRange = [];
  isAuthorized: boolean = JSON.parse(localStorage.getItem('authorized')) === 'done' || false;
  isAdmin: boolean = JSON.parse(localStorage.getItem('admin')) === 'done' || false;
  categories = new FormControl();
  searchValue = '';
  products: IProduct[] = JSON.parse(localStorage.getItem('products')) || [];
  initProducts: IProduct[] = JSON.parse(localStorage.getItem('products')) || [];
  basketProducts: IProduct[] = JSON.parse(localStorage.getItem('basketProducts')) || [];

  constructor() { }

  ngOnInit(): void {
    this.categoryList = CATEGORIES;
    this.ageRange = AGE_RANGE;
  }

  logout () {
    localStorage.removeItem('authorized');
    localStorage.removeItem('admin');
    localStorage.removeItem('basketProducts');
    this.isAuthorized = false;
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

  onAddBasket = (product: IProduct) => {
    this.basketProducts = [...this.basketProducts, product];
    localStorage.setItem('basketProducts', JSON.stringify(this.basketProducts));
  }

  onRemoveBasket = (id: number) => {
    this.basketProducts = this.basketProducts.filter(e => e.id !== id);
    localStorage.setItem('basketProducts', JSON.stringify(this.basketProducts));
  }

}
