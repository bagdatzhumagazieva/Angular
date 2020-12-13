import { Component, OnInit } from '@angular/core';
import {IProduct} from '../models';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basketProducts: IProduct[] = JSON.parse(localStorage.getItem('basketProducts')) || [];

  constructor() { }

  ngOnInit(): void {
  }

}
