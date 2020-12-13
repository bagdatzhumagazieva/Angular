import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from '../models';
import {AGE_RANGE, CATEGORIES} from '../mocks/shop';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-product',
  templateUrl: './item-product.component.html',
  styleUrls: ['./item-product.component.scss']
})
export class ItemProductComponent implements OnInit {
  @Input() product: IProduct;
  @Input() isAdmin?: boolean;
  @Input() withBasket?: boolean;
  @Output() onDeleteProduct: EventEmitter<number> = new EventEmitter<number>();
  @Output() onAddBasket: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() onRemoveBasket: EventEmitter<number> = new EventEmitter<number>();

  basketProducts: IProduct[] = JSON.parse(localStorage.getItem('basketProducts')) || [];
  categoryName = [];
  ages = '';
  inBasket = false;

  constructor() { }

  ngOnInit(): void {
    this.inBasket = this.basketProducts.findIndex(e => e.id === this.product.id) !== -1;
    this.categoryName = this.product.categoryIds.map(e => CATEGORIES.find(c => c.id === e)?.name);
    this.ages = AGE_RANGE.find(e => e.id === this.product.ageRangeId).age || '';
  }

  handleAddBasket = () => {
    this.onAddBasket.emit(this.product);
    this.inBasket = !this.inBasket;
  }

  handleRemoveBasket = () => {
    this.onRemoveBasket.emit(this.product.id);
    this.inBasket = !this.inBasket;
  }

}
